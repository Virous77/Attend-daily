import React from "react";
import { PostListProps, StateType } from "./postList";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";
import { useUserContext } from "@/store/useUserContext";
import useProfileAction from "@/hooks/useProfileAction";
import Like from "@/common/like";

type PostActionProps = {
  setOpen: React.Dispatch<React.SetStateAction<StateType>>;
};

const PostAction: React.FC<PostListProps & PostActionProps> = ({
  post,
  setOpen,
}) => {
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
      <Like value={post.like.like} handleLike={() => handleLike(post._id)} />

      <span
        className=" cursor-pointer"
        onClick={() =>
          setOpen((prev) => ({ ...prev, active: true, post: post }))
        }
      >
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
