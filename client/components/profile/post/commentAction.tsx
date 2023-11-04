import { FaRegComment } from "react-icons/fa";
import Like from "@/common/like";
import { MainComments } from "@/types/types";
import useProfileAction from "@/hooks/useProfileAction";

type CommentActionType = {
  comment: MainComments;
};

const CommentAction: React.FC<CommentActionType> = ({ comment }) => {
  const { mutate, setQuery } = useProfileAction();

  const handleLike = (commentId: string) => {
    setQuery(`${comment.postId}-comment`);
    mutate({ postId: commentId, endPoints: "/comment/like", type: "parent" });
  };
  return (
    <div className=" pl-12">
      <Like value={comment.like} handleLike={() => handleLike(comment._id)} />
    </div>
  );
};

export default CommentAction;
