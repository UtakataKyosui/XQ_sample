import React, { useEffect, useState, useCallback } from "react";
import { PostComponent } from "./PostComponent";
import { PostForm } from "./PostForm";
import { useXQPosts, useXQStream } from "../hooks/useXQStream";
import { Post, User } from "../_generated/xq/core_pb";

interface TimelineProps {
  currentUserId: number;
  showPostForm?: boolean;
  userId?: number; // 特定ユーザーの投稿のみ表示する場合
}

export function Timeline({
  currentUserId,
  showPostForm = true,
  userId,
}: TimelineProps) {
  const [users, setUsers] = useState<Map<number, User>>(new Map());
  const [replyToPost, setReplyToPost] = useState<number | null>(null);

  const { posts, loading, error, fetchPosts, createPost } = useXQPosts();
  const { events, isConnected } = useXQStream(currentUserId, [
    "post_created",
    "user_updated",
  ]);

  // 初回データロード
  useEffect(() => {
    fetchPosts({ userId, limit: 20 });
  }, [fetchPosts, userId]);

  // ストリーミングイベントの処理
  useEffect(() => {
    events.forEach((event) => {
      if (event.eventType === "post_created" && event.post) {
        // 新しい投稿をタイムラインに追加（重複チェック）
        const newPost = event.post;
        const existingPostIndex = posts.findIndex(
          (p) => p.getId() === newPost.getId(),
        );
        if (existingPostIndex === -1) {
          // 新しい投稿なので追加
          fetchPosts({ userId, limit: 20 }); // リフレッシュ
        }
      } else if (event.eventType === "user_updated" && event.user) {
        // ユーザー情報を更新
        const updatedUser = event.user;
        setUsers((prev) => new Map(prev.set(updatedUser.getId(), updatedUser)));
      }
    });
  }, [events, posts, fetchPosts, userId]);

  const handlePostCreated = useCallback(
    (newPost: Post) => {
      setReplyToPost(null);
      // 投稿後にタイムラインを更新
      fetchPosts({ userId, limit: 20 });
    },
    [fetchPosts, userId],
  );

  const handleReply = useCallback((postId: number) => {
    setReplyToPost(postId);
  }, []);

  const handleRepost = useCallback(
    async (postId: number) => {
      try {
        await createPost({
          authorId: currentUserId,
          text: "",
          visibility: 1, // PUBLIC
          repostOfId: postId,
        });
      } catch (err) {
        console.error("リポストに失敗しました:", err);
      }
    },
    [createPost, currentUserId],
  );

  const handleLike = useCallback((postId: number) => {
    // いいね機能は今回は省略（将来的に実装）
    console.log("いいね:", postId);
  }, []);

  const loadMorePosts = useCallback(() => {
    if (posts.length > 0) {
      const lastPost = posts[posts.length - 1];
      fetchPosts({
        userId,
        limit: 20,
        beforeId: lastPost.getId(),
      });
    }
  }, [posts, fetchPosts, userId]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        エラーが発生しました: {error}
        <button
          onClick={() => fetchPosts({ userId, limit: 20 })}
          className="ml-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded transition-colors"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* 接続状態表示 */}
      <div
        className={`mb-4 p-2 text-center text-sm rounded ${
          isConnected
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-yellow-50 text-yellow-700 border border-yellow-200"
        }`}
      >
        {isConnected ? "🟢 リアルタイム接続中" : "🟡 接続待機中"}
      </div>

      {/* 投稿フォーム */}
      {showPostForm && (
        <>
          <PostForm
            currentUserId={currentUserId}
            onPostCreated={handlePostCreated}
          />

          {replyToPost && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  💬 #{replyToPost} に返信中
                </span>
                <button
                  onClick={() => setReplyToPost(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <PostForm
                currentUserId={currentUserId}
                replyToId={replyToPost}
                placeholder="返信を入力..."
                onPostCreated={handlePostCreated}
              />
            </div>
          )}
        </>
      )}

      {/* ローディング表示 */}
      {loading && posts.length === 0 && (
        <div className="text-center py-8">
          <div className="animate-spin text-4xl mb-2">⏳</div>
          <div className="text-gray-600">投稿を読み込み中...</div>
        </div>
      )}

      {/* タイムライン */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostComponent
            key={post.getId()}
            post={post}
            author={users.get(post.getAuthorId())}
            onReply={handleReply}
            onRepost={handleRepost}
            onLike={handleLike}
          />
        ))}
      </div>

      {/* 投稿が0件の場合 */}
      {posts.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <div className="text-lg mb-2">投稿がありません</div>
          <div className="text-sm">
            {userId
              ? "このユーザーはまだ投稿していません"
              : "最初の投稿をしてみましょう！"}
          </div>
        </div>
      )}

      {/* もっと読み込むボタン */}
      {posts.length > 0 && (
        <div className="text-center py-4">
          <button
            onClick={loadMorePosts}
            disabled={loading}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "読み込み中..." : "もっと読み込む"}
          </button>
        </div>
      )}

      {/* リアルタイム更新通知 */}
      {events.length > 0 && (
        <div className="fixed bottom-4 right-4 max-w-sm">
          <div className="bg-blue-600 text-white p-3 rounded-lg shadow-lg">
            <div className="text-sm font-medium">
              📡 {events.length} 件の新しい更新
            </div>
            <div className="text-xs mt-1 opacity-90">
              リアルタイムで受信しています
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
