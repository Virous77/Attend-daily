import React from "react";
import { PostListProps, StateType } from "../components/profile/post/postList";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";
import { useUserContext } from "@/store/useUserContext";
import useProfileAction from "@/hooks/useProfileAction";
import Like from "@/common/like";
import { usePathname } from "next/navigation";

type PostActionProps = {
  setOpen?: React.Dispatch<React.SetStateAction<StateType>>;
};

const PostAction: React.FC<PostListProps & PostActionProps> = ({ post }) => {
  const { networkData } = useUserContext();
  const { mutate, setQuery } = useProfileAction();
  const path = usePathname();

  const handleLike = (postId: string) => {
    const key = path.includes("/profile")
      ? "post"
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

  return (
    <div className=" pt-1 pl-1 flex items-center justify-between w-full">
      <Like value={post.like.like} handleLike={() => handleLike(post._id)} />

      <div className="flex items-center gap-1">
        <span className=" cursor-pointer">
          <FaRegComment size={20} />
        </span>
        {post.totalComments > 0 && (
          <p className=" leading-none">{post.totalComments}</p>
        )}
      </div>

      <span
        className=" cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FaRetweet size={20} />
      </span>

      <div className=" flex items-center">
        {networkData?.data?.bookMarks?.includes(post._id) ? (
          <span
            className=" cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleBookmark(post._id);
            }}
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
    </div>
  );
};

export default PostAction;