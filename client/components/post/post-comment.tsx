"use client";

import { CommentReplies } from "@/types/types";
import CommonComment from "@/common/comment";
import { CommentSkeleton } from "../skeleton/skeleton";
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";

type CommentProps = {
  postId: string;
};

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const { invalidateKey } = useQueryInvalidate();
  const {
    postData,
    fetchNextPage,
    infiniteQuery,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQueryCustom<CommentReplies>({
    endPoints: `comment/${postId}?pageSize=10`,
    staleTime: Infinity,
    key: `${postId}-comment`,
    enabled: postId ? true : false,
    type: "main-comment",
  });

  const handleRefresh = async () => {
    invalidateKey([`${postId}-comment`]);
  };

  if (isLoading) return <CommentSkeleton />;

  return (
    <section className=" p-4 pt-0 mb-[60px]">
      <CommonComment
        data={postData}
        type="p"
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        infiniteQuery={infiniteQuery}
      />
    </section>
  );
};

export default Comment;
