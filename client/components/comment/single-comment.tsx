"use client";

import Header from "@/common/header";
import HeaderChildren from "../post/headerChildren";
import CommentForm from "@/common/commentForm";
import useQueryFetch from "@/hooks/useQueryFetch";
import {
  QueryResponse,
  QueryData,
  MainComments,
  CommentReplies,
} from "@/types/types";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import CommonComment from "@/common/comment";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import CommentAction from "../../common/commentAction";
import CommentAuthor from "@/common/commentAuthor";

type Response = QueryResponse & {
  fetchResult: QueryData & {
    data: {
      comment: MainComments;
      commentChild: CommentReplies[];
    };
  };
};

const SingleComment = () => {
  const params = useParams();
  const path = usePathname();

  const { fetchResult, isPending }: Response = useQueryFetch({
    endPoints: `comment/single/${params.id}/${
      path.includes("/comment/p/") ? "parent" : "child"
    }`,
    key: `${params.id}-comment`,
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return <p>Loading....</p>;

  return (
    <main className=" mt-12 p-4">
      <Header name="Comment">
        <HeaderChildren />
      </Header>
      <div>
        <Card className=" p-4">
          <CommentAuthor
            date={fetchResult.data.comment.createdAt}
            user={fetchResult.data.comment.commentedUser}
          />
          <CardBody className=" p-0 mt-3">
            <p className=" pl-[59px] leading-none">
              {fetchResult.data.comment.content}
            </p>
          </CardBody>
          <CardFooter className=" pl-2 mt-2 pb-0">
            <CommentAction
              comment={fetchResult.data.comment}
              type={path.includes("/comment/p/") ? "p" : "c"}
            />
          </CardFooter>
        </Card>
      </div>
      <CommonComment data={fetchResult.data.commentChild} type={"c"} />
      <CommentForm
        postId={fetchResult.data.comment.postId}
        commentId={params.id}
        type={path.includes("/comment/p/") ? "parent" : "child"}
      />
    </main>
  );
};

export default SingleComment;
