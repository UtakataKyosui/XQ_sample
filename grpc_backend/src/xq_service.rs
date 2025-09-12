use crate::xq::{
    CreatePostRequest, CreatePostResponse, CreateUserRequest, CreateUserResponse, GetPostsRequest,
    GetPostsResponse, GetUserRequest, GetUserResponse, Post, StreamEvent, StreamEventsRequest,
    User, Visibility, xq_service_server::XqService,
};
use prost_types::Timestamp;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tokio::sync::mpsc;
use tokio_stream::wrappers::ReceiverStream;
use tonic::{Request, Response, Result, Status};

#[derive(Debug, Default)]
pub struct XQServiceImpl {
    users: Arc<Mutex<HashMap<u64, User>>>,
    posts: Arc<Mutex<HashMap<u64, Post>>>,
    next_user_id: Arc<Mutex<u64>>,
    next_post_id: Arc<Mutex<u64>>,
}

impl XQServiceImpl {
    pub fn new() -> Self {
        let mut service = Self::default();

        // 初期デモデータを作成
        service.create_demo_data();

        service
    }

    fn create_demo_data(&mut self) {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap();

        let timestamp = Timestamp {
            seconds: now.as_secs() as i64,
            nanos: 0,
        };

        // デモユーザー1
        let user1 = User {
            id: 1,
            username: "alice".to_string(),
            display_name: "Alice".to_string(),
            bio: "XQ SNS のデモユーザーです 👋".to_string(),
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice".to_string(),
            created_at: Some(timestamp.clone()),
            updated_at: Some(timestamp.clone()),
        };

        // デモユーザー2
        let user2 = User {
            id: 2,
            username: "bob".to_string(),
            display_name: "Bob".to_string(),
            bio: "こんにちは！テスト投稿をしています 🚀".to_string(),
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob".to_string(),
            created_at: Some(timestamp.clone()),
            updated_at: Some(timestamp.clone()),
        };

        self.users.lock().unwrap().insert(1, user1);
        self.users.lock().unwrap().insert(2, user2);
        *self.next_user_id.lock().unwrap() = 3;

        // デモ投稿
        let post1 = Post {
            id: 1,
            author_id: 1,
            text: "XQ SNS へようこそ！🎉 これは最初のデモ投稿です。".to_string(),
            cw: "".to_string(),
            visibility: Visibility::Public as i32,
            reply_to_id: 0,
            repost_of_id: 0,
            tags: vec!["welcome".to_string(), "demo".to_string()],
            mentions: vec![],
            attachments: vec![],
            created_at: Some(timestamp.clone()),
            updated_at: Some(timestamp.clone()),
            edited_at: None,
        };

        let post2 = Post {
            id: 2,
            author_id: 2,
            text: "リアルタイムストリーミング機能をテスト中です 📡".to_string(),
            cw: "".to_string(),
            visibility: Visibility::Public as i32,
            reply_to_id: 0,
            repost_of_id: 0,
            tags: vec!["test".to_string(), "streaming".to_string()],
            mentions: vec![],
            attachments: vec![],
            created_at: Some(timestamp.clone()),
            updated_at: Some(timestamp.clone()),
            edited_at: None,
        };

        self.posts.lock().unwrap().insert(1, post1);
        self.posts.lock().unwrap().insert(2, post2);
        *self.next_post_id.lock().unwrap() = 3;
    }

    fn get_current_timestamp() -> Timestamp {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap();

        Timestamp {
            seconds: now.as_secs() as i64,
            nanos: 0,
        }
    }
}

#[tonic::async_trait]
impl XqService for XQServiceImpl {
    async fn create_user(
        &self,
        request: Request<CreateUserRequest>,
    ) -> Result<Response<CreateUserResponse>, Status> {
        let req = request.into_inner();

        // 新しいユーザーIDを生成
        let user_id = {
            let mut next_id = self.next_user_id.lock().unwrap();
            let id = *next_id;
            *next_id += 1;
            id
        };

        let now = Self::get_current_timestamp();

        let user = User {
            id: user_id,
            username: req.username,
            display_name: req.display_name,
            bio: req.bio,
            avatar_url: req.avatar_url,
            created_at: Some(now.clone()),
            updated_at: Some(now),
        };

        // ユーザーを保存
        self.users.lock().unwrap().insert(user_id, user.clone());

        let response = CreateUserResponse { user: Some(user) };

        Ok(Response::new(response))
    }

    async fn get_user(
        &self,
        request: Request<GetUserRequest>,
    ) -> Result<Response<GetUserResponse>, Status> {
        let req = request.into_inner();

        let users = self.users.lock().unwrap();

        if let Some(user) = users.get(&req.id) {
            let response = GetUserResponse {
                user: Some(user.clone()),
            };
            Ok(Response::new(response))
        } else {
            Err(Status::not_found("User not found"))
        }
    }

    async fn create_post(
        &self,
        request: Request<CreatePostRequest>,
    ) -> Result<Response<CreatePostResponse>, Status> {
        let req = request.into_inner();

        // ユーザーの存在確認
        {
            let users = self.users.lock().unwrap();
            if !users.contains_key(&req.author_id) {
                return Err(Status::not_found("Author not found"));
            }
        }

        // 新しい投稿IDを生成
        let post_id = {
            let mut next_id = self.next_post_id.lock().unwrap();
            let id = *next_id;
            *next_id += 1;
            id
        };

        let now = Self::get_current_timestamp();

        let post = Post {
            id: post_id,
            author_id: req.author_id,
            text: req.text,
            cw: req.cw,
            visibility: req.visibility,
            reply_to_id: req.reply_to_id,
            repost_of_id: req.repost_of_id,
            tags: req.tags,
            mentions: req.mentions,
            attachments: vec![], // 今回は実装省略
            created_at: Some(now.clone()),
            updated_at: Some(now),
            edited_at: None,
        };

        // 投稿を保存
        self.posts.lock().unwrap().insert(post_id, post.clone());

        let response = CreatePostResponse { post: Some(post) };

        Ok(Response::new(response))
    }

    async fn get_posts(
        &self,
        request: Request<GetPostsRequest>,
    ) -> Result<Response<GetPostsResponse>, Status> {
        let req = request.into_inner();

        let posts = self.posts.lock().unwrap();

        let mut filtered_posts: Vec<Post> = posts
            .values()
            .filter(|post| {
                // ユーザー指定がある場合は、そのユーザーの投稿のみ
                if req.user_id > 0 && post.author_id != req.user_id {
                    return false;
                }

                // before_id 指定がある場合は、それより前の投稿のみ
                if req.before_id > 0 && post.id >= req.before_id {
                    return false;
                }

                true
            })
            .cloned()
            .collect();

        // IDの降順でソート（新しい順）
        filtered_posts.sort_by(|a, b| b.id.cmp(&a.id));

        // 制限数を適用
        let limit = if req.limit > 0 {
            req.limit as usize
        } else {
            20
        };
        filtered_posts.truncate(limit);

        let response = GetPostsResponse {
            posts: filtered_posts,
        };

        Ok(Response::new(response))
    }

    type StreamEventsStream = ReceiverStream<Result<StreamEvent, Status>>;

    async fn stream_events(
        &self,
        _request: Request<tonic::Streaming<StreamEventsRequest>>,
    ) -> Result<Response<Self::StreamEventsStream>, Status> {
        let (tx, rx) = mpsc::channel(4);

        // 接続確認イベントを送信
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(tokio::time::Duration::from_secs(30));

            loop {
                interval.tick().await;

                let event = StreamEvent {
                    event_type: "heartbeat".to_string(),
                    event_data: None,
                    timestamp: Some(XQServiceImpl::get_current_timestamp()),
                };

                if tx.send(Ok(event)).await.is_err() {
                    break;
                }
            }
        });

        Ok(Response::new(ReceiverStream::new(rx)))
    }
}
