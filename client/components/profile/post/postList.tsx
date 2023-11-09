import { Like, Post, User } from "@/types/types";
import PostCommon from "@/common/post";

export type PostListProps = {
  post: Post & { like: Like } & { userId: User };
};

const PostList: React.FC<PostListProps> = ({ post }) => {
  return (
    <>
      <PostCommon post={post} />
    </>
  );
};

export default PostList;
