pub mod converter;
pub mod helloworld;
pub mod models;
pub mod xq;
pub mod xq_service;

use helloworld::greeter_server::{Greeter, GreeterServer};
use helloworld::{HelloReply, HelloRequest};
use tonic::{Request, Response, Status, transport::Server};
use tonic_web::GrpcWebLayer;
use tower_http::cors::CorsLayer;
use xq::xq_service_server::XqServiceServer;
use xq_service::XQServiceImpl;

#[derive(Default)]
pub struct MyGreeter {}

#[tonic::async_trait]
impl Greeter for MyGreeter {
    async fn say_hello(
        &self,
        request: Request<HelloRequest>,
    ) -> Result<Response<HelloReply>, Status> {
        Ok(Response::new(helloworld::HelloReply {
            message: format!("Hello {}", request.into_inner().name),
        }))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let greeter = MyGreeter::default();
    let xq_service = XQServiceImpl::new();
    let allow_cors = CorsLayer::new()
        .allow_origin(tower_http::cors::Any)
        .allow_headers(tower_http::cors::Any)
        .allow_methods(tower_http::cors::Any);
    Server::builder()
        .accept_http1(true)
        .layer(allow_cors)
        .layer(GrpcWebLayer::new())
        .add_service(GreeterServer::new(greeter))
        .add_service(XqServiceServer::new(xq_service))
        .serve("[::1]:50051".parse().unwrap())
        .await?;
    Ok(())
}
