import { Like, Post } from "@/types/types";
import React, { useState } from "react";
import Comment from "./comment";
import PostCommon from "@/common/post";

export type PostListProps = {
  post: Post & { like: Like };
};

export type StateType = {
  post: (Post & { like: Like }) | null;
  active: boolean;
};
const PostList: React.FC<PostListProps> = ({ post }) => {
  const [open, setOpen] = useState<StateType>({
    post: null,
    active: false,
  });

  return (
    <>
      <PostCommon post={post} />
      <Comment open={open} setOpen={setOpen} />
    </>
  );
};

export default PostList;
