import { type } from "os";

export type AppError = {
  message: string;
  stack: string;
  status: number;
  success: boolean;
};

type common = {
  _id: string;
  updatedAt: string;
  createdAt: string;
};

export type User = common & {
  name: string;
  email: string;
  image: string;
  userName: string;
  bio: string;
  token: string;
};

export type UserNetwork = common & {
  userId: string;
  totalPost: number;
  followers: [
    {
      id: string;
      followedAt: string;
    }
  ];
  following: [
    {
      id: string;
      followedAt: string;
    }
  ];
  bookMarks: string[];
};

export type Post = common & {
  userId: string;
  image: string[];
  video: string[];
  title: string;
  pin: boolean;
  totalComments: number;
};

export type Like = common & {
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
  state: boolean;
};

export type MainComments = common & {
  postId: string;
  commentedUser: {
    _id: string;
    name: string;
    userName: string;
    image: string;
  };
  content: string;
  like: string[];
};

export type CommentReplies = MainComments & {
  commentId: string;
};
