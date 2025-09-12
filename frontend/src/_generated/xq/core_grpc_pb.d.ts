// package: xq
// file: xq/core.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as xq_core_pb from "../xq/core_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IXQServiceService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  createUser: IXQServiceService_ICreateUser;
  getUser: IXQServiceService_IGetUser;
  createPost: IXQServiceService_ICreatePost;
  getPosts: IXQServiceService_IGetPosts;
  streamEvents: IXQServiceService_IStreamEvents;
}

interface IXQServiceService_ICreateUser
  extends grpc.MethodDefinition<
    xq_core_pb.CreateUserRequest,
    xq_core_pb.CreateUserResponse
  > {
  path: "/xq.XQService/CreateUser";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<xq_core_pb.CreateUserRequest>;
  requestDeserialize: grpc.deserialize<xq_core_pb.CreateUserRequest>;
  responseSerialize: grpc.serialize<xq_core_pb.CreateUserResponse>;
  responseDeserialize: grpc.deserialize<xq_core_pb.CreateUserResponse>;
}
interface IXQServiceService_IGetUser
  extends grpc.MethodDefinition<
    xq_core_pb.GetUserRequest,
    xq_core_pb.GetUserResponse
  > {
  path: "/xq.XQService/GetUser";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<xq_core_pb.GetUserRequest>;
  requestDeserialize: grpc.deserialize<xq_core_pb.GetUserRequest>;
  responseSerialize: grpc.serialize<xq_core_pb.GetUserResponse>;
  responseDeserialize: grpc.deserialize<xq_core_pb.GetUserResponse>;
}
interface IXQServiceService_ICreatePost
  extends grpc.MethodDefinition<
    xq_core_pb.CreatePostRequest,
    xq_core_pb.CreatePostResponse
  > {
  path: "/xq.XQService/CreatePost";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<xq_core_pb.CreatePostRequest>;
  requestDeserialize: grpc.deserialize<xq_core_pb.CreatePostRequest>;
  responseSerialize: grpc.serialize<xq_core_pb.CreatePostResponse>;
  responseDeserialize: grpc.deserialize<xq_core_pb.CreatePostResponse>;
}
interface IXQServiceService_IGetPosts
  extends grpc.MethodDefinition<
    xq_core_pb.GetPostsRequest,
    xq_core_pb.GetPostsResponse
  > {
  path: "/xq.XQService/GetPosts";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<xq_core_pb.GetPostsRequest>;
  requestDeserialize: grpc.deserialize<xq_core_pb.GetPostsRequest>;
  responseSerialize: grpc.serialize<xq_core_pb.GetPostsResponse>;
  responseDeserialize: grpc.deserialize<xq_core_pb.GetPostsResponse>;
}
interface IXQServiceService_IStreamEvents
  extends grpc.MethodDefinition<
    xq_core_pb.StreamEventsRequest,
    xq_core_pb.StreamEvent
  > {
  path: "/xq.XQService/StreamEvents";
  requestStream: true;
  responseStream: true;
  requestSerialize: grpc.serialize<xq_core_pb.StreamEventsRequest>;
  requestDeserialize: grpc.deserialize<xq_core_pb.StreamEventsRequest>;
  responseSerialize: grpc.serialize<xq_core_pb.StreamEvent>;
  responseDeserialize: grpc.deserialize<xq_core_pb.StreamEvent>;
}

export const XQServiceService: IXQServiceService;

export interface IXQServiceServer extends grpc.UntypedServiceImplementation {
  createUser: grpc.handleUnaryCall<
    xq_core_pb.CreateUserRequest,
    xq_core_pb.CreateUserResponse
  >;
  getUser: grpc.handleUnaryCall<
    xq_core_pb.GetUserRequest,
    xq_core_pb.GetUserResponse
  >;
  createPost: grpc.handleUnaryCall<
    xq_core_pb.CreatePostRequest,
    xq_core_pb.CreatePostResponse
  >;
  getPosts: grpc.handleUnaryCall<
    xq_core_pb.GetPostsRequest,
    xq_core_pb.GetPostsResponse
  >;
  streamEvents: grpc.handleBidiStreamingCall<
    xq_core_pb.StreamEventsRequest,
    xq_core_pb.StreamEvent
  >;
}

export interface IXQServiceClient {
  createUser(
    request: xq_core_pb.CreateUserRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreateUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  createUser(
    request: xq_core_pb.CreateUserRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreateUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  createUser(
    request: xq_core_pb.CreateUserRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreateUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getUser(
    request: xq_core_pb.GetUserRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getUser(
    request: xq_core_pb.GetUserRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getUser(
    request: xq_core_pb.GetUserRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  createPost(
    request: xq_core_pb.CreatePostRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreatePostResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  createPost(
    request: xq_core_pb.CreatePostRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreatePostResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  createPost(
    request: xq_core_pb.CreatePostRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreatePostResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getPosts(
    request: xq_core_pb.GetPostsRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetPostsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getPosts(
    request: xq_core_pb.GetPostsRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetPostsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getPosts(
    request: xq_core_pb.GetPostsRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetPostsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  streamEvents(): grpc.ClientDuplexStream<
    xq_core_pb.StreamEventsRequest,
    xq_core_pb.StreamEvent
  >;
  streamEvents(
    options: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    xq_core_pb.StreamEventsRequest,
    xq_core_pb.StreamEvent
  >;
  streamEvents(
    metadata: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    xq_core_pb.StreamEventsRequest,
    xq_core_pb.StreamEvent
  >;
}

export class XQServiceClient extends grpc.Client implements IXQServiceClient {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: Partial<grpc.ClientOptions>,
  );
  public createUser(
    request: xq_core_pb.CreateUserRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreateUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public createUser(
    request: xq_core_pb.CreateUserRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreateUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public createUser(
    request: xq_core_pb.CreateUserRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreateUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getUser(
    request: xq_core_pb.GetUserRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getUser(
    request: xq_core_pb.GetUserRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getUser(
    request: xq_core_pb.GetUserRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public createPost(
    request: xq_core_pb.CreatePostRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreatePostResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public createPost(
    request: xq_core_pb.CreatePostRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreatePostResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public createPost(
    request: xq_core_pb.CreatePostRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.CreatePostResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getPosts(
    request: xq_core_pb.GetPostsRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetPostsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getPosts(
    request: xq_core_pb.GetPostsRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetPostsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getPosts(
    request: xq_core_pb.GetPostsRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: xq_core_pb.GetPostsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public streamEvents(
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    xq_core_pb.StreamEventsRequest,
    xq_core_pb.StreamEvent
  >;
  public streamEvents(
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientDuplexStream<
    xq_core_pb.StreamEventsRequest,
    xq_core_pb.StreamEvent
  >;
}
