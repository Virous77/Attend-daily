import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileSignature, Flag, Trash2, UserMinus, UserPlus } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import { useAppContext } from "@/store/useAppContext";
import { PostProps } from "@/common/post";
import { useUserContext } from "@/store/useUserContext";
import { usePost } from "@/store/usePostContext";
import moment from "moment";

const Dropdown: React.FC<PostProps> = ({ post }) => {
  const {
    state: { user },
    setActiveType,
    setState,
  } = useAppContext();
  const { networkData, handleFollow } = useUserContext();
  const { modal, setPreview, setFormData, setChoice, setTime } = usePost();
  const followedId = networkData?.data?.following?.map((id) => id.id._id);

  const handleEdit = ({ post }: PostProps) => {
    setActiveType(post.postType === "post" ? "edit-post" : "edit-poll");
    setPreview((prev) => ({ ...prev, image: post.image, video: post.video }));
    setFormData((prev) => ({
      ...prev,
      title: post.title,
      pin: post.pin,
      location: post.location,
      postType: post.postType,
      id: post._id,
    }));

    if (post.postType === "poll") {
      const currentTime = moment(post.poll.expiryDate).format("hh:mm:A");
      const formatTime = currentTime.split(":");
      setChoice(post.poll.choice);
      setTime((prev) => ({
        ...prev,
        hour: formatTime[0],
        minutes: formatTime[1],
        type: formatTime[2],
        date: new Date(post.poll.expiryDate),
      }));
    }
    modal.onOpen();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" outline-none">
          <BsThreeDots size={20} cursor="pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-fit mr-2 z-[1000]">
        <DropdownMenuGroup>
          {post.userId._id !== user?._id && (
            <>
              {!followedId?.includes(post.userId._id) ? (
                <>
                  <DropdownMenuItem
                    className=" cursor-pointer"
                    onClick={() =>
                      handleFollow(post.userId._id, post.userId.userName)
                    }
                  >
                    <UserPlus className="mr-2" size={20} />
                    <span>Follow</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    className=" cursor-pointer"
                    onClick={() =>
                      handleFollow(post.userId._id, post.userId.userName)
                    }
                  >
                    <UserMinus className="mr-2" size={20} />
                    <span style={{ whiteSpace: "nowrap" }}>
                      Unfollow{" "}
                      <span className=" text-[13px]">
                        @{post.userId.userName}
                      </span>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
            </>
          )}

          {post.userId._id === user?._id && !post.isRetweeted && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  handleEdit({ post });
                }}
              >
                <FileSignature className="mr-2 " size={20} />
                <span>Edit {post.postType === "poll" ? "Poll" : "Post"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem className=" cursor-pointer text-red-500">
            <Flag className="mr-2" size={20} />
            <span>Report</span>
          </DropdownMenuItem>
          {post.userId._id === user?._id && !post.isRetweeted && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className=" bg-red-500 hover:bg-red-400 cursor-pointer"
                onClick={() => {
                  setState((prev) => ({ ...prev, open: `${post._id}-post` }));
                  setActiveType("alert-delete");
                }}
              >
                <Trash2 className="mr-2 " size={20} />
                <span>Delete Post</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
