import Like from "@/common/like";
import useProfileAction from "@/hooks/useProfileAction";
import { useParams, useRouter } from "next/navigation";
import { CommentProps } from "./mainCommentList";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { MessageCircle } from "lucide-react";
import { useAppContext } from "@/store/useAppContext";

const CommentAction: React.FC<CommentProps> = ({ comment, type }) => {
  const { mutateAsync } = useProfileAction();
  const {
    state: { user },
    handleRedirect,
  } = useAppContext();
  const router = useRouter();
  const { id } = useParams();
  const { invalidateKey } = useQueryInvalidate();

  const handleLike = async (commentId: string) => {
    if (!user?.token) {
      return handleRedirect();
    }
    await mutateAsync({
      postId: commentId,
      endPoints: "/comment/like",
      type: type === "p" ? "parent" : "child",
    });
    invalidateKey([`${id}-comment`]);
  };
  return (
    <div className=" flex items-center gap-8" style={{ paddingLeft: "3rem" }}>
      <Like value={comment.like} handleLike={() => handleLike(comment._id)} />

      <div className=" flex items-center gap-2">
        <span
          className=" cursor-pointer"
          onClick={() => router.push(`/comment/${type}/${comment._id}`)}
        >
          <MessageCircle size={20} />
        </span>
        {comment.totalComments > 0 && (
          <p className=" leading-none">{comment.totalComments}</p>
        )}
      </div>
    </div>
  );
};

export default CommentAction;
