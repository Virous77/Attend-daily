import React from "react";
import { PostListProps } from "./postList";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";
import { useAppContext } from "@/store/useAppContext";
import { useUserContext } from "@/store/useUserContext";
import useProfileAction from "@/hooks/useProfileAction";

const PostAction: React.FC<PostListProps> = ({ post }) => {
  const {
    state: { user },
  } = useAppContext();
  const { networkData } = useUserContext();
  const { mutate, setQuery } = useProfileAction();

  const handleLike = (postId: string) => {
    setQuery("post");
    mutate({ postId: postId, endPoints: "/like" });
  };

  const handleBookmark = (postId: string) => {
    setQuery("user-network");
    mutate({ postId: postId, endPoints: "/bookmark" });
  };

  return (
    <div className=" pt-1 pl-1 flex items-center justify-between w-full">
      <div className=" flex items-center gap-1">
        {post.like.like.includes(user?._id || "") ? (
          <span
            className=" cursor-pointer"
            onClick={() => handleLike(post._id)}
          >
            <AiTwotoneHeart size={20} />
          </span>
        ) : (
          <span
            className=" cursor-pointer"
            onClick={() => handleLike(post._id)}
          >
            <AiOutlineHeart size={20} />
          </span>
        )}
        {post.like.like.length > 0 && (
          <p className=" leading-none">{post.like.like.length}</p>
        )}
      </div>

      <span className=" cursor-pointer">
        <FaRegComment size={20} />
      </span>

      <span className=" cursor-pointer">
        <FaRetweet size={20} />
      </span>

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
            onClick={() => handleBookmark(post._id)}
          >
            <BsBookmarkCheck size={20} />
          </span>
        )}
      </div>
    </div>
  );
};

export default PostAction;
