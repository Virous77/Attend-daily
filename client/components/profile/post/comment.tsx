import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { StateType } from "./postList";
import useQueryFetch from "@/hooks/useQueryFetch";
import { QueryResponse, MainComments, QueryData } from "@/types/types";
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
    data: MainComments[];
  };
};

const Comment: React.FC<CommentProps> = ({ open, setOpen }) => {
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
        onOpenChange={() =>
          setOpen((prev) => ({ ...prev, active: false, post: null }))
        }
      >
        <SheetContent side="right" className="w-full" closeButton={true}>
          <SheetHeader className=" -mt-[10px]">
            <SheetTitle>Comment</SheetTitle>
          </SheetHeader>
          {fetchResult?.data?.length > 0 ? (
            <div>
              {fetchResult?.data.map((comment) => (
                <MainCommentList key={comment._id} comment={comment} />
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
          <CommentForm postId={open.post?._id || ""} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Comment;
