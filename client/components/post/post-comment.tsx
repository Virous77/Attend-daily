"use client";

import { CommentReplies, QueryData, QueryResponse } from "@/types/types";
import useQueryFetch from "@/hooks/useQueryFetch";
import CommonComment from "@/common/comment";

type CommentProps = {
  postId: string;
};

type Response = {
  fetchResult: QueryData & {
    data: CommentReplies[];
  };
};

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const { fetchResult, isPending }: QueryResponse & Response = useQueryFetch({
    endPoints: `comment/${postId}`,
    key: `${postId}-comment`,
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <section className=" p-4 pt-0">
      <CommonComment data={fetchResult?.data} type="p" />
    </section>
  );
};

export default Comment;
