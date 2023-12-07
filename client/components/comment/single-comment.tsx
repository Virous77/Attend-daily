"use client";

import Header from "@/common/header";
import HeaderChildren from "../post/headerChildren";
import CommentForm from "@/common/commentForm";
import { MainComments, CommentReplies } from "@/types/types";
import { useParams, usePathname } from "next/navigation";
import CommonComment from "@/common/comment";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import CommentAction from "../../common/commentAction";
import CommentAuthor from "@/common/commentAuthor";
import { CommentSkeleton } from "../skeleton/skeleton";
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { InfiniteQueryFalse } from "@/store/useAppContext";

type Response = {
  data: {
    comment: MainComments;
    commentChild: CommentReplies[];
  };
};

const SingleComment = () => {
  const params = useParams();
  const path = usePathname();

  const { invalidateKey } = useQueryInvalidate();
  const {
    postData,
    fetchNextPage,
    infiniteQuery,
    isLoading,
    isFetchingNextPage,
  }: {
    postData: any;
    fetchNextPage: () => void;
    infiniteQuery: InfiniteQueryFalse;
    isLoading: boolean;
    isFetchingNextPage: boolean;
  } = useInfiniteQueryCustom<Response>({
    endPoints: `comment/single/${params.id}/${
      path.includes("/comment/p/") ? "parent" : "child"
    }?pageSize=10`,
    staleTime: Infinity,
    key: `${params.id}-comment`,
    enabled: params.id ? true : false,
    type: "second-comment",
  });

  const handleRefresh = async () => {
    invalidateKey([`${params.id}-comment`]);
  };

  if (!postData?.[0]?.comment && !isLoading) return <p>Comment not found</p>;

  return (
    <main className=" mt-12 p-4">
      <Header name="Comment">
        <HeaderChildren />
      </Header>
      {isLoading ? (
        <CommentSkeleton />
      ) : (
        <div>
          <Card className=" p-4">
            <CommentAuthor data={postData[0]?.comment} />
            <CardBody className=" p-0 mt-3">
              <p className=" pl-[59px] leading-none">
                {postData[0]?.comment.content}
              </p>
            </CardBody>
            <CardFooter className=" pl-2 mt-2 pb-0">
              <CommentAction
                comment={postData[0]?.comment}
                type={path.includes("/comment/p/") ? "p" : "c"}
              />
            </CardFooter>
          </Card>
        </div>
      )}
      {!isLoading && (
        <CommonComment
          data={postData[0]?.commentChild}
          type={"c"}
          isLoading={isLoading}
          infiniteQuery={infiniteQuery}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          handleRefresh={handleRefresh}
        />
      )}
      {!isLoading && (
        <CommentForm
          postId={postData[0]?.comment.postId}
          commentId={params.id}
          type={path.includes("/comment/p/") ? "parent" : "child"}
        />
      )}
    </main>
  );
};

export default SingleComment;
