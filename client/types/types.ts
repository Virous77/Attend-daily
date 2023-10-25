export type AppError = {
  message: string;
  stack: string;
  status: number;
  success: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  userName: string;
  bio: string;
};
