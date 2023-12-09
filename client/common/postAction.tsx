import React from "react";
import { PostListProps, StateType } from "../components/profile/post/postList";
import { useUserContext } from "@/store/useUserContext";
import useProfileAction from "@/hooks/useProfileAction";
import Like from "@/common/like";
import { usePathname, useRouter } from "next/navigation";
import ShareIT from "./share";
import { useDisclosure } from "@nextui-org/react";
import RePost from "./re-post";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import {
  BookmarkMinus,
  BookmarkPlus,
  MessageCircle,
  Share,
} from "lucide-react";

type PostActionProps = {
  setOpen?: React.Dispatch<React.SetStateAction<StateType>>;
};

const PostAction: React.FC<PostListProps & PostActionProps> = ({ post }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { networkData } = useUserContext();
  const { mutateAsync } = useProfileAction();
  const path = usePathname();
  const router = useRouter();
  const { invalidateKey } = useQueryInvalidate();

  const handleLike = async (postId: string) => {
    const key = path.includes("/profile")
      ? `${post.userId._id}-post`
      : path.includes("/feed")
      ? "feedhome feed"
      : `${postId}-post`;
    await mutateAsync({ postId: postId, endPoints: "/like" });
    invalidateKey([key, "feedposts", "feedpolls"]);
  };

  const handleBookmark = async (postId: string) => {
    await mutateAsync({ postId: postId, endPoints: "/bookmark" });
    invalidateKey(["user-network"]);
  };

  const id = post.isRetweeted ? post.originalPost._id : post._id;

  const totalCommentsCount = post.isRetweeted
    ? post.originalPost.totalComments
    : post.totalComments;

  return (
    <div className="pt-2 pl-1 flex items-center justify-between w-full">
      <Like value={post?.like?.like} handleLike={() => handleLike(id)} />

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

      <div className=" flex items-center">
        {networkData?.data?.bookMarks?.includes(post._id) ? (
          <span
            className=" cursor-pointer"
            onClick={() => handleBookmark(post._id)}
          >
            <BookmarkMinus size={21} color="green" />
          </span>
        ) : (
          <span
            className=" cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleBookmark(post._id);
            }}
          >
            <BookmarkPlus size={21} />
          </span>
        )}
      </div>

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
