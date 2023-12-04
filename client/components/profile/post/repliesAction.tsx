import Like from "@/common/like";
import useProfileAction from "@/hooks/useProfileAction";
import { CommentReplies } from "@/types/types";
import React from "react";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";

const RepliesAction: React.FC<{ comment: CommentReplies }> = ({ comment }) => {
  const { mutateAsync } = useProfileAction();
  const { invalidateKey } = useQueryInvalidate();

  const handleLike = async (commentId: string) => {
    await mutateAsync({
      postId: commentId,
      endPoints: "/comment/like",
      type: "child",
    });
    invalidateKey([`${comment.postId}-comment`]);
  };
  return (
    <div className=" pl-11 mt-2">
      <Like value={comment.like} handleLike={() => handleLike(comment._id)} />
    </div>
  );
};

export default RepliesAction;
