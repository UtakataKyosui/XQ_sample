// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("@grpc/grpc-js");
var xq_core_pb = require("../xq/core_pb.js");
var google_protobuf_timestamp_pb = require("google-protobuf/google/protobuf/timestamp_pb.js");

function serialize_xq_CreatePostRequest(arg) {
  if (!(arg instanceof xq_core_pb.CreatePostRequest)) {
    throw new Error("Expected argument of type xq.CreatePostRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_CreatePostRequest(buffer_arg) {
  return xq_core_pb.CreatePostRequest.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

function serialize_xq_CreatePostResponse(arg) {
  if (!(arg instanceof xq_core_pb.CreatePostResponse)) {
    throw new Error("Expected argument of type xq.CreatePostResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_CreatePostResponse(buffer_arg) {
  return xq_core_pb.CreatePostResponse.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

function serialize_xq_CreateUserRequest(arg) {
  if (!(arg instanceof xq_core_pb.CreateUserRequest)) {
    throw new Error("Expected argument of type xq.CreateUserRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_CreateUserRequest(buffer_arg) {
  return xq_core_pb.CreateUserRequest.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

function serialize_xq_CreateUserResponse(arg) {
  if (!(arg instanceof xq_core_pb.CreateUserResponse)) {
    throw new Error("Expected argument of type xq.CreateUserResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_CreateUserResponse(buffer_arg) {
  return xq_core_pb.CreateUserResponse.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

function serialize_xq_GetPostsRequest(arg) {
  if (!(arg instanceof xq_core_pb.GetPostsRequest)) {
    throw new Error("Expected argument of type xq.GetPostsRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_GetPostsRequest(buffer_arg) {
  return xq_core_pb.GetPostsRequest.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

function serialize_xq_GetPostsResponse(arg) {
  if (!(arg instanceof xq_core_pb.GetPostsResponse)) {
    throw new Error("Expected argument of type xq.GetPostsResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_GetPostsResponse(buffer_arg) {
  return xq_core_pb.GetPostsResponse.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

function serialize_xq_GetUserRequest(arg) {
  if (!(arg instanceof xq_core_pb.GetUserRequest)) {
    throw new Error("Expected argument of type xq.GetUserRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_GetUserRequest(buffer_arg) {
  return xq_core_pb.GetUserRequest.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

function serialize_xq_GetUserResponse(arg) {
  if (!(arg instanceof xq_core_pb.GetUserResponse)) {
    throw new Error("Expected argument of type xq.GetUserResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_GetUserResponse(buffer_arg) {
  return xq_core_pb.GetUserResponse.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

function serialize_xq_StreamEvent(arg) {
  if (!(arg instanceof xq_core_pb.StreamEvent)) {
    throw new Error("Expected argument of type xq.StreamEvent");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_StreamEvent(buffer_arg) {
  return xq_core_pb.StreamEvent.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_xq_StreamEventsRequest(arg) {
  if (!(arg instanceof xq_core_pb.StreamEventsRequest)) {
    throw new Error("Expected argument of type xq.StreamEventsRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_xq_StreamEventsRequest(buffer_arg) {
  return xq_core_pb.StreamEventsRequest.deserializeBinary(
    new Uint8Array(buffer_arg),
  );
}

// XQ SNSサービス
var XQServiceService = (exports.XQServiceService = {
  // ユーザー操作
  createUser: {
    path: "/xq.XQService/CreateUser",
    requestStream: false,
    responseStream: false,
    requestType: xq_core_pb.CreateUserRequest,
    responseType: xq_core_pb.CreateUserResponse,
    requestSerialize: serialize_xq_CreateUserRequest,
    requestDeserialize: deserialize_xq_CreateUserRequest,
    responseSerialize: serialize_xq_CreateUserResponse,
    responseDeserialize: deserialize_xq_CreateUserResponse,
  },
  getUser: {
    path: "/xq.XQService/GetUser",
    requestStream: false,
    responseStream: false,
    requestType: xq_core_pb.GetUserRequest,
    responseType: xq_core_pb.GetUserResponse,
    requestSerialize: serialize_xq_GetUserRequest,
    requestDeserialize: deserialize_xq_GetUserRequest,
    responseSerialize: serialize_xq_GetUserResponse,
    responseDeserialize: deserialize_xq_GetUserResponse,
  },
  // 投稿操作
  createPost: {
    path: "/xq.XQService/CreatePost",
    requestStream: false,
    responseStream: false,
    requestType: xq_core_pb.CreatePostRequest,
    responseType: xq_core_pb.CreatePostResponse,
    requestSerialize: serialize_xq_CreatePostRequest,
    requestDeserialize: deserialize_xq_CreatePostRequest,
    responseSerialize: serialize_xq_CreatePostResponse,
    responseDeserialize: deserialize_xq_CreatePostResponse,
  },
  getPosts: {
    path: "/xq.XQService/GetPosts",
    requestStream: false,
    responseStream: false,
    requestType: xq_core_pb.GetPostsRequest,
    responseType: xq_core_pb.GetPostsResponse,
    requestSerialize: serialize_xq_GetPostsRequest,
    requestDeserialize: deserialize_xq_GetPostsRequest,
    responseSerialize: serialize_xq_GetPostsResponse,
    responseDeserialize: deserialize_xq_GetPostsResponse,
  },
  // リアルタイムストリーミング（双方向）
  streamEvents: {
    path: "/xq.XQService/StreamEvents",
    requestStream: true,
    responseStream: true,
    requestType: xq_core_pb.StreamEventsRequest,
    responseType: xq_core_pb.StreamEvent,
    requestSerialize: serialize_xq_StreamEventsRequest,
    requestDeserialize: deserialize_xq_StreamEventsRequest,
    responseSerialize: serialize_xq_StreamEvent,
    responseDeserialize: deserialize_xq_StreamEvent,
  },
});

exports.XQServiceClient = grpc.makeGenericClientConstructor(
  XQServiceService,
  "XQService",
);
