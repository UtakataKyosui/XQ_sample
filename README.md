# XQ SNS - Misskey風双方向ストリーミングSNS

Misskeyの生みの親が言い出した[XQ](https://github.com/misskey-dev/xq/tree/main)
にインスパイアされた双方向ストリーミング技術を使ったソーシャルネットワークのデモ実装です。

## 特徴

- **リアルタイム双方向通信**: gRPCストリーミングによるリアルタイム投稿配信
- **Misskey風UI**: 投稿、返信、リポスト、公開範囲設定
- **モダンスタック**: Rust (tonic) + TypeScript (Next.js) + Protocol Buffers
- **Content Warning**: 閲覧注意機能
- **タグシステム**: ハッシュタグによる投稿分類

## アーキテクチャ

```
frontend/          - Next.js + React + TypeScript
├── src/
│   ├── components/   - UI コンポーネント
│   ├── hooks/        - React hooks (ストリーミング)
│   ├── services/     - gRPC クライアント
│   └── _generated/   - Protocol Buffers 生成コード
│
grpc_backend/      - Rust + tonic gRPC サーバー
├── src/
│   ├── models/      - データベースエンティティ
│   └── xq.rs        - Protocol Buffers 生成コード
│
proto/             - Protocol Buffers 定義
└── xq/core.proto     - XQ サービス定義
```

## セットアップ

### 1. 依存関係のインストール

**フロントエンド:**
```bash
cd frontend
npm install
```

**バックエンド:**
```bash
cd grpc_backend
cargo build
```

### 2. Protocol Buffers コード生成

```bash
cd frontend
npm run generate:xq
```

### 3. サーバー起動

**gRPCサーバー (別ターミナル):**
```bash
cd grpc_backend
cargo run
```

**フロントエンド開発サーバー:**
```bash
cd frontend
npm run dev
```

### 4. アプリケーションにアクセス

http://localhost:3000 でXQ SNSにアクセスできます。

## 使い方

### 基本機能

1. **ユーザー作成**: デモユーザーを作成してSNSを開始
2. **投稿作成**: テキスト投稿、タグ付け、公開範囲設定
3. **リアルタイム配信**: 新しい投稿を自動受信
4. **返信・リポスト**: 他のユーザーの投稿に反応

### 公開範囲設定

- 🌐 **パブリック**: 全体に公開、連合対応
- 🏠 **ホーム**: ローカルタイムラインのみ
- 👥 **フォロワー**: フォロワー限定
- 📩 **ダイレクト**: ダイレクトメッセージ

### Content Warning

⚠️ CWボタンで閲覧注意の投稿にスポイラー機能を追加できます。

### ハッシュタグ

`#タグ名` 形式でタグを追加し、投稿を分類できます。

## ⚠️ 重要な制限事項

### gRPC-Web ブラウザ制限

現在のブラウザ実装では以下の制限があります：

- **双方向ストリーミング**: grpc-webはブラウザでの双方向ストリーミングをサポートしていません
- **リアルタイム通信**: ストリーミング機能は現在モック実装になっています
- **代替案**: 実際のリアルタイム機能には WebSocket または Server-Sent Events の実装が必要です

### 推奨アーキテクチャ

本格的なリアルタイム機能を実装する場合：
1. gRPC サーバーは従来通り維持
2. ブラウザ向けには WebSocket/SSE エンドポイントを追加
3. フロントエンドは適切なプロトコルを選択

## 技術詳細

### gRPC サービス定義

```protobuf
service XQService {
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  rpc CreatePost(CreatePostRequest) returns (CreatePostResponse);
  rpc GetPosts(GetPostsRequest) returns (GetPostsResponse);
  
  // 双方向ストリーミング
  rpc StreamEvents(stream StreamEventsRequest) returns (stream StreamEvent);
}
```

### リアルタイムストリーミング

```typescript
// React Hook でストリーミング接続
const { events, isConnected } = useXQStream(userId, ['post_created', 'user_updated']);

// 新しい投稿を自動受信
events.forEach(event => {
  if (event.eventType === 'post_created') {
    // タイムライン更新
  }
});
```

### データモデル

- **User**: ユーザー情報（username, display_name, bio, avatar）
- **Post**: 投稿内容（text, cw, visibility, tags, mentions）
- **Visibility**: 公開範囲 (PUBLIC, HOME, FOLLOWERS, DIRECT)

## 開発

### Proto ファイル更新後

```bash
# バックエンド再生成
cd grpc_backend
cargo build

# フロントエンド再生成
cd frontend
npm run generate:xq
```

### デバッグ

- gRPCサーバー: `localhost:50051`
- Webフロントエンド: `localhost:3000`
- リアルタイム接続状態は画面上部で確認可能

## 参考情報

- [XQ Repository](https://github.com/misskey-dev/xq/tree/main)
- [Tonic gRPC Tutorial](https://github.com/hyperium/tonic/blob/master/examples/src/helloworld/server.rs)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [Next.js](https://nextjs.org/)

## ライセンス

MIT License