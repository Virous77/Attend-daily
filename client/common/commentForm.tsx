"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSend } from "react-icons/io";
import Loader from "@/components/ui/loader/Loader";
import useQueryPost from "@/hooks/useQueryPost";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type CommentFormType = {
  postId: string;
  commentId?: string | string[];
  type?: string;
};

const CommentForm: React.FC<CommentFormType> = ({
  postId,
  commentId,
  type,
}) => {
  const { mutateAsync, isPending, setKey } = useQueryPost();
  const client = useQueryClient();
  const [content, setContent] = useState("");

  const handleComment = async () => {
    setKey(`${postId}-comment`);
    const packet = {
      endPoint: commentId ? "comment/replies" : "comment",
      data: {
        content,
        postId: postId,
        commentId: commentId ? commentId : null,
        type: type ? type : "parent",
      },
    };
    const data = await mutateAsync(packet);
    if (data.status === true) {
      client.invalidateQueries({
        queryKey: [`${postId}-post`],
        refetchType: "all",
        exact: true,
      });
      if (commentId) {
        client.invalidateQueries({
          queryKey: [`${commentId}-comment`],
          refetchType: "all",
          exact: true,
        });
      }
      setContent("");
    }
  };

  return (
    <form
      className=" fixed bottom-0 left-0 w-full p-5 bg-accent z-10 flex items-center gap-2 pt-4 pb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button className="w-[60px]" onClick={handleComment} disabled={isPending}>
        {isPending ? <Loader /> : <IoMdSend />}
      </Button>
    </form>
  );
};

export default CommentForm;
