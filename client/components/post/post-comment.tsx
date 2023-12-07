"use client";

import { CommentReplies, QueryData, QueryResponse } from "@/types/types";
import useQueryFetch from "@/hooks/useQueryFetch";
import CommonComment from "@/common/comment";
import { CommentSkeleton } from "../skeleton/skeleton";

type CommentProps = {
  postId: string;
};

type Response = {
  fetchResult: QueryData & {
    data: CommentReplies[];
  };
};

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const { fetchResult, isLoading }: QueryResponse & Response = useQueryFetch({
    endPoints: `comment/${postId}`,
    key: `${postId}-comment`,
    enabled: postId ? true : false,
  });

  if (isLoading) return <CommentSkeleton />;

  return (
    <section className=" p-4 pt-0 mb-[60px]">
      <CommonComment data={fetchResult?.data} type="p" isLoading={isLoading} />
    </section>
  );
};

export default Comment;
