import { FaRegComment } from "react-icons/fa";
import Like from "@/common/like";
import { MainComments } from "@/types/types";
import useProfileAction from "@/hooks/useProfileAction";
import { CommentProps } from "./mainCommentList";

const CommentAction: React.FC<CommentProps> = ({ comment, setComment }) => {
  const { mutate, setQuery } = useProfileAction();

  const handleLike = (commentId: string) => {
    setQuery(`${comment.postId}-comment`);
    mutate({ postId: commentId, endPoints: "/comment/like", type: "parent" });
  };
  return (
    <div className=" pl-12 flex items-center gap-8">
      <Like value={comment.like} handleLike={() => handleLike(comment._id)} />

      <span
        className=" cursor-pointer"
        onClick={() =>
          setComment((prev) => ({
            ...prev,
            commentReplies: true,
            comment: `@${comment.commentedUser.userName}  `,
            commentId: comment._id,
          }))
        }
      >
        <FaRegComment size={20} />
      </span>
    </div>
  );
};

export default CommentAction;
