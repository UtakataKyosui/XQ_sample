import React, { useState } from "react";
import { Visibility } from "../_generated/xq/core_pb";
import { XQClient } from "../services/xq-client";

interface PostFormProps {
  onPostCreated?: (post: any) => void;
  replyToId?: number;
  defaultVisibility?: Visibility;
  placeholder?: string;
  currentUserId: number;
}

export function PostForm({
  onPostCreated,
  replyToId,
  defaultVisibility = Visibility.PUBLIC,
  placeholder = "いまどうしてる？",
  currentUserId,
}: PostFormProps) {
  const [text, setText] = useState("");
  const [cw, setCw] = useState("");
  const [visibility, setVisibility] = useState(defaultVisibility);
  const [showCwInput, setShowCwInput] = useState(false);
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("投稿内容を入力してください");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const client = new XQClient();

      // タグを解析
      const tagList = tags
        .split("#")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const newPost = await client.createPost({
        authorId: currentUserId,
        text: text.trim(),
        cw: showCwInput ? cw.trim() : "",
        visibility: visibility,
        replyToId: replyToId || 0,
        tags: tagList,
      });

      onPostCreated?.(newPost);

      // フォームをリセット
      setText("");
      setCw("");
      setTags("");
      setShowCwInput(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVisibilityIcon = (vis: Visibility) => {
    switch (vis) {
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

  const getVisibilityText = (vis: Visibility) => {
    switch (vis) {
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

  const remainingChars = 500 - text.length;
  const isOverLimit = remainingChars < 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      {replyToId && (
        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
          💬 #{replyToId} に返信しています
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* CW入力 */}
        {showCwInput && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ⚠️ 閲覧注意 (Content Warning)
            </label>
            <input
              type="text"
              value={cw}
              onChange={(e) => setCw(e.target.value)}
              className="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="閲覧注意の理由を入力..."
              maxLength={100}
            />
          </div>
        )}

        {/* メイン投稿フィールド */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isOverLimit ? "border-red-300" : "border-gray-300"
            }`}
            placeholder={placeholder}
            rows={4}
            disabled={isSubmitting}
          />
          <div
            className={`text-right text-sm mt-1 ${
              isOverLimit
                ? "text-red-500"
                : remainingChars < 50
                  ? "text-orange-500"
                  : "text-gray-500"
            }`}
          >
            {remainingChars} 文字
          </div>
        </div>

        {/* タグ入力 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🏷️ タグ
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="#タグ1 #タグ2 ..."
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* コントロールバー */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {/* CWトグル */}
            <button
              type="button"
              onClick={() => setShowCwInput(!showCwInput)}
              className={`p-2 rounded-md text-sm font-medium transition-colors ${
                showCwInput
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ⚠️ CW
            </button>

            {/* 公開範囲選択 */}
            <select
              value={visibility}
              onChange={(e) =>
                setVisibility(parseInt(e.target.value) as Visibility)
              }
              className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value={Visibility.PUBLIC}>🌐 パブリック</option>
              <option value={Visibility.HOME}>🏠 ホーム</option>
              <option value={Visibility.FOLLOWERS}>👥 フォロワー</option>
              <option value={Visibility.DIRECT}>📩 ダイレクト</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500 flex items-center space-x-1">
              <span>{getVisibilityIcon(visibility)}</span>
              <span>{getVisibilityText(visibility)}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !text.trim() || isOverLimit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center space-x-2">
                  <span className="animate-spin">⏳</span>
                  <span>投稿中...</span>
                </span>
              ) : replyToId ? (
                "返信"
              ) : (
                "投稿"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
