import * as grpcWeb from "grpc-web";
import { XQServiceClient } from "../_generated/xq/CoreServiceClientPb";
import {
  User,
  Post,
  CreateUserRequest,
  CreateUserResponse,
  CreatePostRequest,
  CreatePostResponse,
  GetUserRequest,
  GetUserResponse,
  GetPostsRequest,
  GetPostsResponse,
  StreamEventsRequest,
  StreamEvent,
  Visibility,
} from "../_generated/xq/core_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

export class XQClient {
  private client: XQServiceClient;

  constructor(serverAddress: string = "http://localhost:8080") {
    this.client = new XQServiceClient(serverAddress);
  }

  // ユーザー作成
  async createUser(userData: {
    username: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
  }): Promise<User> {
    const request = new CreateUserRequest();
    request.setUsername(userData.username);
    request.setDisplayName(userData.displayName);
    request.setBio(userData.bio);
    request.setAvatarUrl(userData.avatarUrl);

    try {
      const response = await this.client.createUser(request, {});
      const user = response?.getUser();
      if (user) {
        return user;
      } else {
        throw new Error("No user returned");
      }
    } catch (error) {
      throw error;
    }
  }

  // ユーザー取得
  async getUser(userId: number): Promise<User> {
    const request = new GetUserRequest();
    request.setId(userId);

    try {
      const response = await this.client.getUser(request, {});
      const user = response?.getUser();
      if (user) {
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw error;
    }
  }

  // 投稿作成
  async createPost(postData: {
    authorId: number;
    text: string;
    cw?: string;
    visibility: Visibility;
    replyToId?: number;
    repostOfId?: number;
    tags?: string[];
    mentions?: number[];
  }): Promise<Post> {
    const request = new CreatePostRequest();
    request.setAuthorId(postData.authorId);
    request.setText(postData.text);
    request.setCw(postData.cw || "");
    request.setVisibility(postData.visibility);
    request.setReplyToId(postData.replyToId || 0);
    request.setRepostOfId(postData.repostOfId || 0);

    if (postData.tags) {
      request.setTagsList(postData.tags);
    }
    if (postData.mentions) {
      request.setMentionsList(postData.mentions);
    }

    try {
      const response = await this.client.createPost(request, {});
      const post = response?.getPost();
      if (post) {
        return post;
      } else {
        throw new Error("No post returned");
      }
    } catch (error) {
      throw error;
    }
  }

  // 投稿一覧取得
  async getPosts(
    options: {
      userId?: number;
      limit?: number;
      beforeId?: number;
    } = {},
  ): Promise<Post[]> {
    const request = new GetPostsRequest();
    request.setUserId(options.userId || 0);
    request.setLimit(options.limit || 20);
    request.setBeforeId(options.beforeId || 0);

    try {
      const response = await this.client.getPosts(request, {});
      return response?.getPostsList() || [];
    } catch (error) {
      throw error;
    }
  }

  // リアルタイムストリーミング（制限付き）
  // 注意: grpc-webはブラウザでの双方向ストリーミングをサポートしていません
  // 代替案として定期的なポーリングを実装します
  streamEvents(
    userId: number,
    eventTypes: string[],
    onEvent: (event: StreamEvent) => void,
    onError: (error: any) => void,
    onEnd: () => void,
  ): { cancel: () => void } {
    // grpc-webでは双方向ストリーミングが制限されているため、
    // モックの実装を提供します（将来的にWebSocketsやServer-Sent Eventsで置き換え）

    console.warn(
      "gRPC bidirectional streaming is not supported in grpc-web. Using mock implementation.",
    );

    let cancelled = false;
    const intervalId = setInterval(() => {
      if (cancelled) return;

      // モックイベント（実際の実装では WebSocket や SSE を使用）
      const mockEvent = new StreamEvent();
      mockEvent.setEventType("connection_test");
      mockEvent.setTimestamp(XQClient.dateToTimestamp(new Date()));

      onEvent(mockEvent);
    }, 10000); // 10秒ごとにテストイベント

    return {
      cancel: () => {
        cancelled = true;
        clearInterval(intervalId);
        onEnd();
      },
    };
  }

  // ヘルパーメソッド: Visibility enum の変換
  static getVisibilityFromString(visibility: string): Visibility {
    switch (visibility.toLowerCase()) {
      case "public":
        return Visibility.PUBLIC;
      case "home":
        return Visibility.HOME;
      case "followers":
        return Visibility.FOLLOWERS;
      case "direct":
        return Visibility.DIRECT;
      default:
        return Visibility.PUBLIC;
    }
  }

  // ヘルパーメソッド: Timestamp の変換
  static timestampToDate(timestamp: Timestamp | undefined): Date | null {
    if (!timestamp) return null;
    return new Date(
      timestamp.getSeconds() * 1000 + timestamp.getNanos() / 1000000,
    );
  }

  // ヘルパーメソッド: Date to Timestamp の変換
  static dateToTimestamp(date: Date): Timestamp {
    const timestamp = new Timestamp();
    timestamp.setSeconds(Math.floor(date.getTime() / 1000));
    timestamp.setNanos((date.getTime() % 1000) * 1000000);
    return timestamp;
  }
}

// デフォルトのクライアントインスタンス
export const xqClient = new XQClient();
