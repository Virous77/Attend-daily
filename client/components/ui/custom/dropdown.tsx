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

const Dropdown: React.FC<PostProps> = ({ post }) => {
  const {
    state: { user },
  } = useAppContext();
  const { networkData, handleFollow } = useUserContext();

  const followedId = networkData?.data?.following?.map((id) => id.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" outline-none">
          <BsThreeDots size={20} cursor="pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-40 mr-2">
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
              <DropdownMenuItem className="cursor-pointer">
                <MdReportGmailerrorred className="mr-2 " size={20} />
                <span>Edit Post</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem className=" cursor-pointer">
            <TbCopy className="mr-2" size={20} />
            <span>Copy Link</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" cursor-pointer text-red-500">
            <MdReportGmailerrorred className="mr-2" size={20} />
            <span>Report</span>
          </DropdownMenuItem>
          {post.userId._id === user?._id && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className=" bg-red-500 hover:bg-red-400 cursor-pointer">
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
