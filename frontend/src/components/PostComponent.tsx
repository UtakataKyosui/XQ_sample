import React from "react";
import { Post, User, Visibility } from "../_generated/xq/core_pb";
import { XQClient } from "../services/xq-client";

interface PostComponentProps {
  post: Post;
  author?: User;
  onReply?: (postId: number) => void;
  onRepost?: (postId: number) => void;
  onLike?: (postId: number) => void;
}

export function PostComponent({
  post,
  author,
  onReply,
  onRepost,
  onLike,
}: PostComponentProps) {
  const formatTimestamp = (timestamp: any) => {
    const date = XQClient.timestampToDate(timestamp);
    return date ? date.toLocaleString() : "";
  };

  const getVisibilityIcon = (visibility: Visibility) => {
    switch (visibility) {
      case Visibility.PUBLIC:
        return "🌐";
      case Visibility.HOME:
        return "🏠";
      case Visibility.FOLLOWERS:
        return "👥";
      case Visibility.DIRECT:
        return "📩";
      default:
        return "🌐";
    }
  };

  const getVisibilityText = (visibility: Visibility) => {
    switch (visibility) {
      case Visibility.PUBLIC:
        return "パブリック";
      case Visibility.HOME:
        return "ホーム";
      case Visibility.FOLLOWERS:
        return "フォロワー";
      case Visibility.DIRECT:
        return "ダイレクト";
      default:
        return "パブリック";
    }
  };

  const isRepost = post.getRepostOfId() > 0;
  const isReply = post.getReplyToId() > 0;

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm">
      {/* ヘッダー */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {author?.getAvatarUrl() && (
            <img
              src={author.getAvatarUrl()}
              alt={author.getDisplayName() || author.getUsername()}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">
                {author?.getDisplayName() ||
                  author?.getUsername() ||
                  `User ${post.getAuthorId()}`}
              </span>
              {author?.getUsername() && (
                <span className="text-gray-500 text-sm">
                  @{author.getUsername()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{formatTimestamp(post.getCreatedAt())}</span>
              <span className="flex items-center space-x-1">
                <span>{getVisibilityIcon(post.getVisibility())}</span>
                <span>{getVisibilityText(post.getVisibility())}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* リプライ・リポスト表示 */}
      {isReply && (
        <div className="mb-2 text-sm text-gray-600">
          💬 返信先: #{post.getReplyToId()}
        </div>
      )}
      {isRepost && (
        <div className="mb-2 text-sm text-gray-600">
          🔄 リポスト: #{post.getRepostOfId()}
        </div>
      )}

      {/* CW (Content Warning) */}
      {post.getCw() && (
        <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded">
          <div className="text-sm font-medium text-orange-800 mb-1">
            ⚠️ 閲覧注意
          </div>
          <div className="text-sm text-orange-700">{post.getCw()}</div>
        </div>
      )}

      {/* 投稿本文 */}
      <div className="mb-3">
        <p className="text-gray-900 whitespace-pre-wrap">{post.getText()}</p>
      </div>

      {/* タグ */}
      {post.getTagsList().length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {post.getTagsList().map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 添付ファイル */}
      {post.getAttachmentsList().length > 0 && (
        <div className="mb-3">
          <div className="grid grid-cols-2 gap-2">
            {post.getAttachmentsList().map((attachment, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-2"
              >
                {attachment.getMime().startsWith("image/") ? (
                  <img
                    src={attachment.getUrl()}
                    alt="添付画像"
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📎</span>
                    <div>
                      <div className="text-sm font-medium truncate">
                        {attachment.getUrl().split("/").pop()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {(attachment.getSizeBytes() / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex space-x-6">
          <button
            onClick={() => onReply?.(post.getId())}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <span>💬</span>
            <span className="text-sm">返信</span>
          </button>

          <button
            onClick={() => onRepost?.(post.getId())}
            className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
          >
            <span>🔄</span>
            <span className="text-sm">リポスト</span>
          </button>

          <button
            onClick={() => onLike?.(post.getId())}
            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <span>❤️</span>
            <span className="text-sm">いいね</span>
          </button>
        </div>

        {/* 編集日時 */}
        {post.getEditedAt() && (
          <div className="text-xs text-gray-400">
            編集済み: {formatTimestamp(post.getEditedAt())}
          </div>
        )}
      </div>
    </div>
  );
}
