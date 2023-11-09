"use client";

import { Like, Post, QueryData, QueryResponse, User } from "@/types/types";
import Header from "../../common/header";
import HeaderChildren from "./headerChildren";
import PostCommon from "@/common/post";
import Comment from "./post-comment";
import { Separator } from "../ui/separator";
import CommentForm from "../../common/commentForm";
import useQueryFetch from "@/hooks/useQueryFetch";

type PostProps = {
  id: string;
};

type Response = QueryResponse & {
  fetchResult: QueryData & {
    data: Post & { like: Like } & { userId: User };
  };
};

const SinglePost: React.FC<PostProps> = ({ id }) => {
  const { fetchResult, isPending }: Response = useQueryFetch({
    endPoints: `post/${id}`,
    key: `${id}-post`,
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <main>
      <Header name="Post">
        <HeaderChildren />
      </Header>
      <section className=" pt-16 p-4">
        <PostCommon post={fetchResult.data} />
      </section>
      <Separator />
      <Comment postId={fetchResult.data._id} />
      <CommentForm postId={id} />
    </main>
  );
};

export default SinglePost;
