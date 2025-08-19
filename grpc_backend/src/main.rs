pub mod helloworld;

use tonic::{
	transport::Server,
	Request,
	Response,
	Status
};
use helloworld::greeter_server::{Greeter,GreeterServer};
use helloworld::{HelloReply,HelloRequest};
use tonic_web::GrpcWebLayer;  
use tower_http::cors::CorsLayer;  

#[derive(Default)]
pub struct MyGreeter {}

#[tonic::async_trait]
impl Greeter for MyGreeter {
	async fn say_hello(
		&self,
		request: Request<HelloRequest>
	) -> Result<Response<HelloReply>,Status> {
		Ok(Response::new(
			helloworld::HelloReply {
				message: format!("Hello {}",request.into_inner().name)
			}
		))
	}
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>>  {
    let greeter = MyGreeter::default();
	let allow_cors = CorsLayer::new()  
        .allow_origin(tower_http::cors::Any)  
        .allow_headers(tower_http::cors::Any)  
        .allow_methods(tower_http::cors::Any);  
	Server::builder()
		.accept_http1(true)
		.layer(allow_cors)
		.layer(GrpcWebLayer::new())
		.add_service(GreeterServer::new(greeter))
		.serve("[::1]:50051".parse().unwrap())
		.await?;
	Ok(())
}
