import * as jspb from "google-protobuf";

import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb"; // proto import: "google/protobuf/timestamp.proto"

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getUsername(): string;
  setUsername(value: string): User;

  getDisplayName(): string;
  setDisplayName(value: string): User;

  getBio(): string;
  setBio(value: string): User;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): User;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): User;
  hasCreatedAt(): boolean;
  clearCreatedAt(): User;

  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): User;
  hasUpdatedAt(): boolean;
  clearUpdatedAt(): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(
    message: User,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(
    message: User,
    reader: jspb.BinaryReader,
  ): User;
}

export namespace User {
  export type AsObject = {
    id: number;
    username: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject;
  };
}

export class Post extends jspb.Message {
  getId(): number;
  setId(value: number): Post;

  getAuthorId(): number;
  setAuthorId(value: number): Post;

  getText(): string;
  setText(value: string): Post;

  getCw(): string;
  setCw(value: string): Post;

  getVisibility(): Visibility;
  setVisibility(value: Visibility): Post;

  getReplyToId(): number;
  setReplyToId(value: number): Post;

  getRepostOfId(): number;
  setRepostOfId(value: number): Post;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): Post;
  clearTagsList(): Post;
  addTags(value: string, index?: number): Post;

  getMentionsList(): Array<number>;
  setMentionsList(value: Array<number>): Post;
  clearMentionsList(): Post;
  addMentions(value: number, index?: number): Post;

  getAttachmentsList(): Array<Post.Attachment>;
  setAttachmentsList(value: Array<Post.Attachment>): Post;
  clearAttachmentsList(): Post;
  addAttachments(value?: Post.Attachment, index?: number): Post.Attachment;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Post;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Post;

  getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Post;
  hasUpdatedAt(): boolean;
  clearUpdatedAt(): Post;

  getEditedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEditedAt(value?: google_protobuf_timestamp_pb.Timestamp): Post;
  hasEditedAt(): boolean;
  clearEditedAt(): Post;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Post.AsObject;
  static toObject(includeInstance: boolean, msg: Post): Post.AsObject;
  static serializeBinaryToWriter(
    message: Post,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): Post;
  static deserializeBinaryFromReader(
    message: Post,
    reader: jspb.BinaryReader,
  ): Post;
}

export namespace Post {
  export type AsObject = {
    id: number;
    authorId: number;
    text: string;
    cw: string;
    visibility: Visibility;
    replyToId: number;
    repostOfId: number;
    tagsList: Array<string>;
    mentionsList: Array<number>;
    attachmentsList: Array<Post.Attachment.AsObject>;
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    editedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject;
  };

  export class Attachment extends jspb.Message {
    getUrl(): string;
    setUrl(value: string): Attachment;

    getMime(): string;
    setMime(value: string): Attachment;

    getSizeBytes(): number;
    setSizeBytes(value: number): Attachment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Attachment.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: Attachment,
    ): Attachment.AsObject;
    static serializeBinaryToWriter(
      message: Attachment,
      writer: jspb.BinaryWriter,
    ): void;
    static deserializeBinary(bytes: Uint8Array): Attachment;
    static deserializeBinaryFromReader(
      message: Attachment,
      reader: jspb.BinaryReader,
    ): Attachment;
  }

  export namespace Attachment {
    export type AsObject = {
      url: string;
      mime: string;
      sizeBytes: number;
    };
  }
}

export class CreateUserRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): CreateUserRequest;

  getDisplayName(): string;
  setDisplayName(value: string): CreateUserRequest;

  getBio(): string;
  setBio(value: string): CreateUserRequest;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): CreateUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreateUserRequest,
  ): CreateUserRequest.AsObject;
  static serializeBinaryToWriter(
    message: CreateUserRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
  static deserializeBinaryFromReader(
    message: CreateUserRequest,
    reader: jspb.BinaryReader,
  ): CreateUserRequest;
}

export namespace CreateUserRequest {
  export type AsObject = {
    username: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
  };
}

export class CreateUserResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): CreateUserResponse;
  hasUser(): boolean;
  clearUser(): CreateUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreateUserResponse,
  ): CreateUserResponse.AsObject;
  static serializeBinaryToWriter(
    message: CreateUserResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserResponse;
  static deserializeBinaryFromReader(
    message: CreateUserResponse,
    reader: jspb.BinaryReader,
  ): CreateUserResponse;
}

export namespace CreateUserResponse {
  export type AsObject = {
    user?: User.AsObject;
  };
}

export class GetUserRequest extends jspb.Message {
  getId(): number;
  setId(value: number): GetUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetUserRequest,
  ): GetUserRequest.AsObject;
  static serializeBinaryToWriter(
    message: GetUserRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRequest;
  static deserializeBinaryFromReader(
    message: GetUserRequest,
    reader: jspb.BinaryReader,
  ): GetUserRequest;
}

export namespace GetUserRequest {
  export type AsObject = {
    id: number;
  };
}

export class GetUserResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): GetUserResponse;
  hasUser(): boolean;
  clearUser(): GetUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetUserResponse,
  ): GetUserResponse.AsObject;
  static serializeBinaryToWriter(
    message: GetUserResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetUserResponse;
  static deserializeBinaryFromReader(
    message: GetUserResponse,
    reader: jspb.BinaryReader,
  ): GetUserResponse;
}

export namespace GetUserResponse {
  export type AsObject = {
    user?: User.AsObject;
  };
}

export class CreatePostRequest extends jspb.Message {
  getAuthorId(): number;
  setAuthorId(value: number): CreatePostRequest;

  getText(): string;
  setText(value: string): CreatePostRequest;

  getCw(): string;
  setCw(value: string): CreatePostRequest;

  getVisibility(): Visibility;
  setVisibility(value: Visibility): CreatePostRequest;

  getReplyToId(): number;
  setReplyToId(value: number): CreatePostRequest;

  getRepostOfId(): number;
  setRepostOfId(value: number): CreatePostRequest;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): CreatePostRequest;
  clearTagsList(): CreatePostRequest;
  addTags(value: string, index?: number): CreatePostRequest;

  getMentionsList(): Array<number>;
  setMentionsList(value: Array<number>): CreatePostRequest;
  clearMentionsList(): CreatePostRequest;
  addMentions(value: number, index?: number): CreatePostRequest;

  getAttachmentsList(): Array<Post.Attachment>;
  setAttachmentsList(value: Array<Post.Attachment>): CreatePostRequest;
  clearAttachmentsList(): CreatePostRequest;
  addAttachments(value?: Post.Attachment, index?: number): Post.Attachment;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePostRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreatePostRequest,
  ): CreatePostRequest.AsObject;
  static serializeBinaryToWriter(
    message: CreatePostRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreatePostRequest;
  static deserializeBinaryFromReader(
    message: CreatePostRequest,
    reader: jspb.BinaryReader,
  ): CreatePostRequest;
}

export namespace CreatePostRequest {
  export type AsObject = {
    authorId: number;
    text: string;
    cw: string;
    visibility: Visibility;
    replyToId: number;
    repostOfId: number;
    tagsList: Array<string>;
    mentionsList: Array<number>;
    attachmentsList: Array<Post.Attachment.AsObject>;
  };
}

export class CreatePostResponse extends jspb.Message {
  getPost(): Post | undefined;
  setPost(value?: Post): CreatePostResponse;
  hasPost(): boolean;
  clearPost(): CreatePostResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePostResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreatePostResponse,
  ): CreatePostResponse.AsObject;
  static serializeBinaryToWriter(
    message: CreatePostResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreatePostResponse;
  static deserializeBinaryFromReader(
    message: CreatePostResponse,
    reader: jspb.BinaryReader,
  ): CreatePostResponse;
}

export namespace CreatePostResponse {
  export type AsObject = {
    post?: Post.AsObject;
  };
}

export class GetPostsRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): GetPostsRequest;

  getLimit(): number;
  setLimit(value: number): GetPostsRequest;

  getBeforeId(): number;
  setBeforeId(value: number): GetPostsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPostsRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetPostsRequest,
  ): GetPostsRequest.AsObject;
  static serializeBinaryToWriter(
    message: GetPostsRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetPostsRequest;
  static deserializeBinaryFromReader(
    message: GetPostsRequest,
    reader: jspb.BinaryReader,
  ): GetPostsRequest;
}

export namespace GetPostsRequest {
  export type AsObject = {
    userId: number;
    limit: number;
    beforeId: number;
  };
}

export class GetPostsResponse extends jspb.Message {
  getPostsList(): Array<Post>;
  setPostsList(value: Array<Post>): GetPostsResponse;
  clearPostsList(): GetPostsResponse;
  addPosts(value?: Post, index?: number): Post;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPostsResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetPostsResponse,
  ): GetPostsResponse.AsObject;
  static serializeBinaryToWriter(
    message: GetPostsResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetPostsResponse;
  static deserializeBinaryFromReader(
    message: GetPostsResponse,
    reader: jspb.BinaryReader,
  ): GetPostsResponse;
}

export namespace GetPostsResponse {
  export type AsObject = {
    postsList: Array<Post.AsObject>;
  };
}

export class StreamEventsRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): StreamEventsRequest;

  getEventTypesList(): Array<string>;
  setEventTypesList(value: Array<string>): StreamEventsRequest;
  clearEventTypesList(): StreamEventsRequest;
  addEventTypes(value: string, index?: number): StreamEventsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamEventsRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StreamEventsRequest,
  ): StreamEventsRequest.AsObject;
  static serializeBinaryToWriter(
    message: StreamEventsRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): StreamEventsRequest;
  static deserializeBinaryFromReader(
    message: StreamEventsRequest,
    reader: jspb.BinaryReader,
  ): StreamEventsRequest;
}

export namespace StreamEventsRequest {
  export type AsObject = {
    userId: number;
    eventTypesList: Array<string>;
  };
}

export class StreamEvent extends jspb.Message {
  getEventType(): string;
  setEventType(value: string): StreamEvent;

  getPost(): Post | undefined;
  setPost(value?: Post): StreamEvent;
  hasPost(): boolean;
  clearPost(): StreamEvent;

  getUser(): User | undefined;
  setUser(value?: User): StreamEvent;
  hasUser(): boolean;
  clearUser(): StreamEvent;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): StreamEvent;
  hasTimestamp(): boolean;
  clearTimestamp(): StreamEvent;

  getEventDataCase(): StreamEvent.EventDataCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamEvent.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StreamEvent,
  ): StreamEvent.AsObject;
  static serializeBinaryToWriter(
    message: StreamEvent,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): StreamEvent;
  static deserializeBinaryFromReader(
    message: StreamEvent,
    reader: jspb.BinaryReader,
  ): StreamEvent;
}

export namespace StreamEvent {
  export type AsObject = {
    eventType: string;
    post?: Post.AsObject;
    user?: User.AsObject;
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject;
  };

  export enum EventDataCase {
    EVENT_DATA_NOT_SET = 0,
    POST = 2,
    USER = 3,
  }
}

export enum Visibility {
  VISIBILITY_UNSPECIFIED = 0,
  PUBLIC = 1,
  HOME = 2,
  FOLLOWERS = 3,
  DIRECT = 4,
}
