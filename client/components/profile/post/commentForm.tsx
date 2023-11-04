import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSend } from "react-icons/io";
import Loader from "@/components/ui/loader/Loader";
import useQueryPost from "@/hooks/useQueryPost";
import { useQueryClient } from "@tanstack/react-query";

type CommentFormType = {
  postId: string;
  comment: {
    comment: string;
    commentReplies: boolean;
    commentId: string;
  };
  setComment: React.Dispatch<
    React.SetStateAction<{
      comment: string;
      commentReplies: boolean;
      commentId: string;
    }>
  >;
};

const CommentForm: React.FC<CommentFormType> = ({
  postId,
  comment,
  setComment,
}) => {
  const { mutateAsync, isPending, setKey } = useQueryPost();
  const client = useQueryClient();

  const handleComment = async () => {
    setKey(`${postId}-comment`);
    const packet = {
      endPoint: comment.commentReplies ? "comment/replies" : "comment",
      data: {
        content: comment.comment,
        postId: postId,
        commentId: comment.commentId ? comment.commentId : null,
      },
    };
    const data = await mutateAsync(packet);
    if (data.status === true) {
      client.invalidateQueries({
        queryKey: ["post"],
        refetchType: "all",
        exact: true,
      });
      setComment((prev) => ({
        ...prev,
        comment: "",
        commentId: "",
        commentReplies: false,
      }));
    }
  };

  return (
    <form
      className=" fixed bottom-0 left-0 w-full p-5 bg-accent z-10 flex items-center gap-2 pt-4 pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        placeholder="Add a comment..."
        value={comment.comment}
        onChange={(e) =>
          setComment((prev) => ({ ...prev, comment: e.target.value }))
        }
      />
      <Button className="w-[60px]" onClick={handleComment} disabled={isPending}>
        {isPending ? <Loader /> : <IoMdSend />}
      </Button>
    </form>
  );
};

export default CommentForm;
