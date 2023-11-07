import Like from "@/common/like";
import useProfileAction from "@/hooks/useProfileAction";
import { CommentReplies } from "@/types/types";
import React from "react";

const RepliesAction: React.FC<{ comment: CommentReplies }> = ({ comment }) => {
  const { mutate, setQuery } = useProfileAction();

  const handleLike = (commentId: string) => {
    setQuery(`${comment.postId}-comment`);
    mutate({
      postId: commentId,
      endPoints: "/comment/like",
      type: "child",
    });
  };
  return (
    <div className=" pl-11 mt-2">
      <Like value={comment.like} handleLike={() => handleLike(comment._id)} />
    </div>
  );
};

export default RepliesAction;
