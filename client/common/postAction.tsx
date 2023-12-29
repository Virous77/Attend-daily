import React from "react";
import { PostListProps, StateType } from "../components/profile/post/postList";
import useProfileAction from "@/hooks/useProfileAction";
import Like from "@/common/like";
import { usePathname, useRouter } from "next/navigation";
import ShareIT from "./share";
import { useDisclosure } from "@nextui-org/react";
import RePost from "./re-post";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { MessageCircle, Share } from "lucide-react";
import { useAppContext } from "@/store/useAppContext";
import Bookmark from "./bookmark";

type PostActionProps = {
  setOpen?: React.Dispatch<React.SetStateAction<StateType>>;
};

const PostAction: React.FC<PostListProps & PostActionProps> = ({ post }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutateAsync } = useProfileAction();
  const path = usePathname();
  const router = useRouter();
  const { invalidateKey } = useQueryInvalidate();
  const {
    state: { user },
    handleRedirect,
  } = useAppContext();

  const handleLike = async (postId: string) => {
    if (!user?.token) {
      return handleRedirect();
    }

    const key = path.includes("/profile")
      ? `${post.userId._id}-post`
      : path.includes("/feed")
      ? "feedhome feed"
      : `${postId}-post`;
    await mutateAsync({ postId: postId, endPoints: "/like" });
    invalidateKey([key, "feedposts", "feedpolls"]);
  };

  const handleBookmark = async (postId: string) => {
    if (!user?.token) {
      return handleRedirect();
    }
    await mutateAsync({ postId: postId, endPoints: "/bookmark" });
    invalidateKey(["user-network"]);
  };

  const id = post.isRetweeted ? post.originalPost._id : post._id;

  const totalCommentsCount = post.isRetweeted
    ? post.originalPost.totalComments
    : post.totalComments;

  return (
    <div className="pt-2 pl-1 flex items-center justify-between w-full">
      <Like value={post?.like.like} handleLike={() => handleLike(id)} />

      <div className="flex items-center gap-1">
        <span
          className=" cursor-pointer"
          onClick={() => router.push(`/post/${id}`)}
        >
          <MessageCircle size={20} />
        </span>
        {totalCommentsCount > 0 && (
          <p className=" leading-none">{totalCommentsCount}</p>
        )}
      </div>

      <RePost post={post} />

      <Bookmark handleBookmark={handleBookmark} postId={post._id} />

      <div className=" cursor-pointer" onClick={onOpen}>
        <Share size={20} />
      </div>
      <ShareIT
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        url={`/post/${post._id}`}
        name="Post"
      />
    </div>
  );
};

export default PostAction;
