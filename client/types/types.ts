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
      id: User;
      followedAt: string;
    }
  ];
  following: [
    {
      id: User;
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
  location: string;
  postType: string;
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
