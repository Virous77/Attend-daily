import MainCommentList from "@/common/mainCommentList";
import { CommentReplies } from "@/types/types";
import { Image } from "@nextui-org/react";
import React from "react";
import noComment from "../public/comment.svg";

type CommentProps = {
  data: CommentReplies[];
  type: string;
};

const CommonComment: React.FC<CommentProps> = ({ data, type }) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="pb-4">
          {data?.map((comment) => (
            <MainCommentList key={comment._id} comment={comment} type={type} />
          ))}
        </div>
      ) : (
        <div className=" flex items-center justify-center mt-8 flex-col">
          <Image
            src={noComment.src}
            alt="no-comment"
            width={100}
            height={100}
            placeholder="blur"
          />
          <p className=" text-[12px] mt-2">No Comment founds.</p>
        </div>
      )}
    </>
  );
};

export default CommonComment;
