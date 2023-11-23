import { Like, Poll, Post, User } from "@/types/types";
import PostCommon from "@/common/post";

export type PostListProps = {
  post: Post & { like: Like } & { userId: User } & { poll: Poll };
};

export type StateType = {
  post: (Post & { like: Like }) | null;
  active: boolean;
};

const PostList: React.FC<PostListProps> = ({ post }) => {
  return <PostCommon post={post} />;
};

export default PostList;
