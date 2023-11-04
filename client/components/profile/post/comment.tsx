import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { StateType } from "./postList";
import useQueryFetch from "@/hooks/useQueryFetch";
import {
  QueryResponse,
  MainComments,
  QueryData,
  CommentReplies,
} from "@/types/types";
import { Image } from "@nextui-org/react";
import noComment from "../../../public/comment.svg";
import CommentForm from "./commentForm";
import MainCommentList from "./mainCommentList";

type CommentProps = {
  setOpen: React.Dispatch<React.SetStateAction<StateType>>;
  open: StateType;
};

type Response = QueryResponse & {
  fetchResult: QueryData & {
    data: {
      comments: MainComments[];
      commentsReplies: CommentReplies[];
    };
  };
};

const Comment: React.FC<CommentProps> = ({ open, setOpen }) => {
  const [newComment, setComment] = useState({
    comment: "",
    commentReplies: false,
    commentId: "",
  });

  const { fetchResult, isPending }: Response = useQueryFetch({
    endPoints: `comment/${open.post?._id}`,
    key: `${open.post?._id}-comment`,
    staleTime: 5 * 60 * 1000,
    enabled: open.active ? true : false,
  });

  return (
    <div>
      <Sheet
        open={open.active}
        onOpenChange={() => {
          setOpen((prev) => ({ ...prev, active: false, post: null }));
          setComment((prev) => ({
            ...prev,
            comment: "",
            commentId: "",
            commentReplies: false,
          }));
        }}
      >
        <SheetContent side="right" className="w-full" closeButton={true}>
          <SheetHeader className=" -mt-[10px]">
            <SheetTitle>Comment</SheetTitle>
          </SheetHeader>
          {fetchResult?.data?.comments?.length > 0 ? (
            <div className=" overflow-scroll h-[84vh] pb-4">
              {fetchResult?.data.comments?.map((comment) => (
                <MainCommentList
                  key={comment._id}
                  comment={comment}
                  setComment={setComment}
                  commentReplies={fetchResult?.data?.commentsReplies.filter(
                    (reply) => reply.commentId === comment._id
                  )}
                />
              ))}
            </div>
          ) : (
            <div className=" flex items-center justify-center h-[70vh]">
              <Image
                src={noComment.src}
                alt="no-comment"
                width={300}
                height={300}
                placeholder="blur"
              />
            </div>
          )}
          <CommentForm
            postId={open.post?._id || ""}
            comment={newComment}
            setComment={setComment}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Comment;
