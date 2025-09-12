import { useEffect, useState, useCallback, useRef } from "react";
import { XQClient } from "../services/xq-client";
import { StreamEvent, Post, User } from "../_generated/xq/core_pb";

export interface StreamEventData {
  eventType: string;
  post?: Post;
  user?: User;
  timestamp: Date;
}

export function useXQStream(
  userId: number,
  eventTypes: string[] = ["post_created", "user_updated"],
) {
  const [events, setEvents] = useState<StreamEventData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<XQClient | null>(null);
  const streamRef = useRef<{ cancel: () => void } | null>(null);

  const connect = useCallback(() => {
    if (clientRef.current || !userId) return;

    try {
      clientRef.current = new XQClient();

      const onEvent = (event: StreamEvent) => {
        const eventData: StreamEventData = {
          eventType: event.getEventType(),
          timestamp:
            XQClient.timestampToDate(event.getTimestamp()) || new Date(),
        };

        // イベントデータの種類に応じて処理
        if (event.hasPost()) {
          eventData.post = event.getPost();
        } else if (event.hasUser()) {
          eventData.user = event.getUser();
        }

        setEvents((prev) => [eventData, ...prev.slice(0, 99)]); // 最新100件まで保持
      };

      const onError = (err: any) => {
        setError(err.message || "Stream error");
        setIsConnected(false);
      };

      const onEnd = () => {
        setIsConnected(false);
      };

      streamRef.current = clientRef.current.streamEvents(
        userId,
        eventTypes,
        onEvent,
        onError,
        onEnd,
      );

      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed");
      setIsConnected(false);
    }
  }, [userId, eventTypes]);

  const disconnect = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.cancel();
      streamRef.current = null;
    }
    if (clientRef.current) {
      clientRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  useEffect(() => {
    if (userId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [userId, connect, disconnect]);

  return {
    events,
    isConnected,
    error,
    connect,
    disconnect,
    clearEvents,
  };
}

export function useXQPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<XQClient>(new XQClient());

  const fetchPosts = useCallback(
    async (
      options: {
        userId?: number;
        limit?: number;
        beforeId?: number;
      } = {},
    ) => {
      setLoading(true);
      setError(null);

      try {
        const fetchedPosts = await clientRef.current.getPosts(options);
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createPost = useCallback(
    async (postData: {
      authorId: number;
      text: string;
      cw?: string;
      visibility: number;
      replyToId?: number;
      repostOfId?: number;
      tags?: string[];
      mentions?: number[];
    }) => {
      setError(null);

      try {
        const newPost = await clientRef.current.createPost(postData);
        setPosts((prev) => [newPost, ...prev]);
        return newPost;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create post");
        throw err;
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      // grpc-web では明示的なクライアントクローズは不要
    };
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
  };
}

export function useXQUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<XQClient>(new XQClient());

  const fetchUser = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);

    try {
      const fetchedUser = await clientRef.current.getUser(userId);
      setUser(fetchedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (userData: {
      username: string;
      displayName: string;
      bio: string;
      avatarUrl: string;
    }) => {
      setError(null);

      try {
        const newUser = await clientRef.current.createUser(userData);
        setUser(newUser);
        return newUser;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create user");
        throw err;
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      // grpc-web では明示的なクライアントクローズは不要
    };
  }, []);

  return {
    user,
    loading,
    error,
    fetchUser,
    createUser,
  };
}
