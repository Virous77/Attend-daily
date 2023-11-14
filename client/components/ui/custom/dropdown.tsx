import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, UserMinus } from "lucide-react";
import { MdReportGmailerrorred } from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { useAppContext } from "@/store/useAppContext";
import { PostProps } from "@/common/post";
import { useUserContext } from "@/store/useUserContext";
import { usePost } from "@/store/usePostContext";

const Dropdown: React.FC<PostProps> = ({ post }) => {
  const {
    state: { user },
    setActiveType,
    setState,
  } = useAppContext();
  const { networkData, handleFollow } = useUserContext();
  const { modal, setPreview, setFormData } = usePost();
  const followedId = networkData?.data?.following?.map((id) => id.id);

  const handleEdit = ({ post }: PostProps) => {
    setActiveType("edit-post");
    setPreview((prev) => ({ ...prev, image: post.image, video: post.video }));
    setFormData((prev) => ({
      ...prev,
      title: post.title,
      pin: post.pin,
      location: post.location,
      postType: post.postType,
      id: post._id,
    }));
    modal.onOpen();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" outline-none">
          <BsThreeDots size={20} cursor="pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-fit mr-2">
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
                    <User className="mr-2" size={20} />
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

          {post.userId._id === user?._id && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  handleEdit({ post });
                }}
              >
                <MdReportGmailerrorred className="mr-2 " size={20} />
                <span>Edit Post</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem className=" cursor-pointer text-red-500">
            <MdReportGmailerrorred className="mr-2" size={20} />
            <span>Report</span>
          </DropdownMenuItem>
          {post.userId._id === user?._id && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className=" bg-red-500 hover:bg-red-400 cursor-pointer"
                onClick={() => {
                  setState((prev) => ({ ...prev, open: post._id }));
                  setActiveType("alert-delete");
                }}
              >
                <MdReportGmailerrorred className="mr-2 " size={20} />
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
