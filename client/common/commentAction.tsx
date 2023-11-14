import { FaRegComment } from "react-icons/fa";
import Like from "@/common/like";
import useProfileAction from "@/hooks/useProfileAction";
import { useParams, useRouter } from "next/navigation";
import { CommentProps } from "./mainCommentList";

const CommentAction: React.FC<CommentProps> = ({ comment, type }) => {
  const { mutate, setQuery } = useProfileAction();
  const router = useRouter();
  const { id } = useParams();

  const handleLike = (commentId: string) => {
    setQuery(`${id}-comment`);
    mutate({
      postId: commentId,
      endPoints: "/comment/like",
      type: type === "p" ? "parent" : "child",
    });
  };
  return (
    <div className=" flex items-center gap-8" style={{ paddingLeft: "3rem" }}>
      <Like value={comment.like} handleLike={() => handleLike(comment._id)} />

      <div className=" flex items-center gap-2">
        <span
          className=" cursor-pointer"
          onClick={() => router.push(`/comment/${type}/${comment._id}`)}
        >
          <FaRegComment size={20} />
        </span>
        {comment.totalComments > 0 && (
          <p className=" leading-none">{comment.totalComments}</p>
        )}
      </div>
    </div>
  );
};

export default CommentAction;
