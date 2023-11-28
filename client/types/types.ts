export type AppError = {
  message: string;
  stack: string;
  status: number;
  success: boolean;
};

export type common = {
  _id: string;
  updatedAt: string;
  createdAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  userName: string;
  bio: string;
  token: string;
};

export type NetworkUser = {
  id: User;
  followedAt: string;
}[];

export type UserNetwork = common & {
  userId: string;
  totalPost: number;
  followers: NetworkUser;
  following: NetworkUser;
  bookMarks: string[];
};

export type Post = common & {
  userId: string;
  image: string[];
  video: string[];
  title: string;
  pin: boolean;
  totalComments: number;
  location: string;
  postType: string;
  originalPost: {
    _id: string;
    totalComments: number;
    userId: User;
    retweetUser: {
      _id: string;
      postId: string;
      users: string;
    };
  };
  isDeleted: boolean;
  isRetweeted: boolean;
  retweetUser: {
    _id: string;
    postId: string;
    users: string;
  };
};

export type Like = {
  postId: string;
  like: string[];
};

export type QueryResponse = {
  isPending: boolean;
  refetch: () => void;
  isError: boolean;
  error: Error | null;
};

export type QueryData = {
  message: string;
  status: boolean;
};

export type MainComments = common & {
  postId: string;
  commentedUser: User;
  content: string;
  like: string[];
  isDeleted: boolean;
  totalComments: number;
};

export type CommentReplies = MainComments & {
  commentId: string;
};

export type Poll = {
  choice: string[];
  vote: number[];
  _id: string;
  expiryDate: number;
  voters: string[];
  postId: string;
};

export type Notification = common & {
  notificationFor: string;
  notificationBy: {
    _id: string;
    name: string;
    userName: string;
    image: string;
  };
  isViewed: boolean;
  notificationRef: {
    _id: string;
    postId: string;
    commentId: string;
  } | null;
  notificationType: "user" | "post" | "comment" | "commentReplies";
  message: string;
  notificationEvent:
    | "follow"
    | "repost"
    | "like"
    | "poll"
    | "comment"
    | "commentReplies";
};
