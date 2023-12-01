import React from "react";
import { PostListProps, StateType } from "../components/profile/post/postList";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";
import { useUserContext } from "@/store/useUserContext";
import useProfileAction from "@/hooks/useProfileAction";
import Like from "@/common/like";
import { usePathname, useRouter } from "next/navigation";
import { MdIosShare } from "react-icons/md";
import Share from "./share";
import { useDisclosure } from "@nextui-org/react";
import RePost from "./re-post";

type PostActionProps = {
  setOpen?: React.Dispatch<React.SetStateAction<StateType>>;
};

const PostAction: React.FC<PostListProps & PostActionProps> = ({ post }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { networkData } = useUserContext();
  const { mutate, setQuery } = useProfileAction();
  const path = usePathname();
  const router = useRouter();

  const handleLike = (postId: string) => {
    const key = path.includes("/profile")
      ? `${post.userId._id}-post`
      : path.includes("/feed")
      ? "feed"
      : `${postId}-post`;
    setQuery(key);
    mutate({ postId: postId, endPoints: "/like" });
  };

  const handleBookmark = (postId: string) => {
    setQuery("user-network");
    mutate({ postId: postId, endPoints: "/bookmark" });
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
          <FaRegComment size={20} />
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
            <BsBookmarkCheckFill size={20} />
          </span>
        ) : (
          <span
            className=" cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleBookmark(post._id);
            }}
          >
            <BsBookmarkCheck size={20} />
          </span>
        )}
      </div>

      <div className=" cursor-pointer" onClick={onOpen}>
        <MdIosShare size={20} />
      </div>
      <Share
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        url={`/post/${post._id}`}
        name="Post"
      />
    </div>
  );
};

export default PostAction;
