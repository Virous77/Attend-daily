import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import Loader from "@/components/ui/loader/Loader";
import useQueryPost from "@/hooks/useQueryPost";

type CommentFormType = {
  postId: string;
};

const CommentForm: React.FC<CommentFormType> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { mutateAsync, isPending, setKey } = useQueryPost();

  const handleComment = async () => {
    setKey(`${postId}-comment`);
    const packet = {
      endPoint: "comment",
      data: {
        content: comment,
        postId,
      },
    };
    const data = await mutateAsync(packet);
    if (data.status === true) {
      setComment("");
    }
  };

  return (
    <form
      className=" fixed bottom-0 left-0 w-full p-5 bg-accent z-10 flex items-center gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button className="w-[60px]" onClick={handleComment} disabled={isPending}>
        {isPending ? <Loader /> : <IoMdSend />}
      </Button>
    </form>
  );
};

export default CommentForm;
