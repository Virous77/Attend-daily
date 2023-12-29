"use client";

import Loader from "@/components/ui/loader/Loader";
import useQueryPost from "@/hooks/useQueryPost";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { useAppContext } from "@/store/useAppContext";
import useQueryPut from "@/hooks/useQueryPut";
import { Button, Input } from "@nextui-org/react";
import { SendHorizontal } from "lucide-react";

type CommentFormType = {
  postId: string;
  commentId?: string | string[];
  type?: string;
};

type PacketType =
  | {
      endPoint: string;
      data: any;
    }
  | any;

const CommentForm: React.FC<CommentFormType> = ({
  postId,
  commentId,
  type,
}) => {
  const { mutateAsync, isPending } = useQueryPost();
  const { invalidateKey } = useQueryInvalidate();
  const {
    content,
    setContent,
    activeType,
    setActiveType,
    setTempComment,
    state: { user },
  } = useAppContext();
  const { mutateAsync: editMutateAsync, isPending: editPending } =
    useQueryPut();

  const common = () => {
    invalidateKey([
      `${postId}-comment`,
      `${postId}-post`,
      "feedhome feed",
      "feedposts",
      "feedpolls",
    ]);
    if (commentId) {
      invalidateKey([`${commentId}-comment`]);
    }
    setContent((prev) => ({ ...prev, new: "", edit: null }));
  };

  const handleComment = async () => {
    let packet: PacketType = "";
    if (activeType !== "edit-comment") {
      packet = {
        endPoint: commentId ? "comment/replies" : "comment",
        data: {
          content: content.new,
          postId: postId,
          commentId: commentId ? commentId : null,
          type: type ? type : "parent",
        },
      };
      setTempComment({
        commentedUser: user!,
        _id: "hwhddh83",
        content: content.new,
        postId: postId,
        like: [],
        createdAt: "2023-12-29T13:45:20.271Z",
        updatedAt: "2023-12-29T13:45:20.271Z",
        totalComments: 0,
        isDeleted: false,
        commentId: "hjwdjwhdueh",
      });

      const data = await mutateAsync(packet);
      if (data.status) {
        common();
      }
    } else {
      packet = {
        endPoint: "comment",
        data: {
          content: content.new,
          commentId: content.edit?._id,
          type: content.edit?.commentId ? "child" : "parent",
        },
      };
      const data = await editMutateAsync(packet);
      if (data.status) {
        setActiveType("");
        common();
      }
    }
  };

  return (
    <form
      className={`fixed bottom-0 left-0 w-full p-5 $
       z-10 flex items-center gap-2 pt-4 pb-4`}
      onSubmit={(e) => e.preventDefault()}
      style={{
        background:
          activeType === "edit-comment" ? "black" : "rgba(0,0,0,0.85)",
      }}
    >
      <Input
        placeholder="Add a comment..."
        value={content.new}
        onChange={(e) =>
          setContent((prev) => ({ ...prev, new: e.target.value }))
        }
        variant="bordered"
      />
      <Button
        className="w-[60px] rounded"
        onClick={handleComment}
        variant="shadow"
        color="primary"
        disabled={isPending || editPending}
      >
        {isPending || editPending ? <Loader /> : <SendHorizontal />}
      </Button>
      {activeType === "edit-comment" && (
        <Button
          className="w-[60px] rounded"
          variant="ghost"
          color="primary"
          onClick={() => {
            setContent((prev) => ({ ...prev, new: "", edit: null }));
            setActiveType("");
          }}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default CommentForm;
