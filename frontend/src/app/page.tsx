"use client";

import React, { useState, useEffect } from "react";
import { Timeline } from "../components/Timeline";
import { useXQUser } from "../hooks/useXQStream";

export default function Home() {
  const [currentUserId, setCurrentUserId] = useState<number>(1); // デモ用の固定ユーザーID
  const { user, loading: userLoading, fetchUser, createUser } = useXQUser();
  const [showUserSetup, setShowUserSetup] = useState(false);

  // デモ用ユーザーの初期化
  useEffect(() => {
    if (currentUserId) {
      fetchUser(currentUserId);
    }
  }, [currentUserId, fetchUser]);

  const handleCreateDemoUser = async () => {
    try {
      await createUser({
        username: `user_${Date.now()}`,
        displayName: "XQ Demo User",
        bio: "XQ SNSのデモユーザーです",
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      });
      setShowUserSetup(false);
    } catch (error) {
      console.error("ユーザー作成に失敗しました:", error);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <div className="text-xl text-gray-600">XQ SNS を起動中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-blue-600">🌐 XQ SNS</div>
              <div className="text-sm text-gray-500">
                - Misskey風双方向ストリーミングSNS
              </div>
            </div>

            {user && (
              <div className="flex items-center space-x-3">
                <img
                  src={user.getAvatarUrl()}
                  alt={user.getDisplayName()}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-sm">
                  <div className="font-medium">{user.getDisplayName()}</div>
                  <div className="text-gray-500">@{user.getUsername()}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {!user && !showUserSetup ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              XQ SNS へようこそ
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Misskeyにインスパイアされた双方向ストリーミング技術を使ったソーシャルネットワークです。
              リアルタイムで投稿や更新を受信できます。
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setShowUserSetup(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                デモユーザーを作成して始める
              </button>
              <div className="text-sm text-gray-500">
                既存のユーザーでテストする場合:
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => setCurrentUserId(1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                  >
                    User 1
                  </button>
                  <button
                    onClick={() => setCurrentUserId(2)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                  >
                    User 2
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : showUserSetup ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4">デモユーザーを作成</h2>
              <p className="text-gray-600 mb-6">
                XQ SNSのデモ用にユーザーアカウントを作成します。
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleCreateDemoUser}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  デモユーザーを作成
                </button>
                <button
                  onClick={() => setShowUserSetup(false)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Timeline currentUserId={currentUserId} />
        )}
      </main>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <div className="mb-2">
            🔧 XQ SNS - Misskey風双方向ストリーミングSNS のデモ実装
          </div>
          <div>gRPC + Protocol Buffers + React + Next.js で構築</div>
        </div>
      </footer>
    </div>
  );
}
