import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { FileSignature, Flag, Trash2, UserMinus, UserPlus } from "lucide-react";
import { useUserContext } from "@/store/useUserContext";
import { useAppContext } from "@/store/useAppContext";
import { MainComments } from "@/types/types";

type CommentDropdownProps = {
  comment: MainComments;
};

const CommentDropdown: React.FC<CommentDropdownProps> = ({ comment }) => {
  const { networkData, handleFollow } = useUserContext();
  const {
    state: { user },
    setState,
    setActiveType,
    setContent,
  } = useAppContext();
  const followedId = networkData?.data?.following?.map((id) => id.id._id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" outline-none">
          <BsThreeDots size={20} cursor="pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-fit mr-2 z-[1000]">
        <DropdownMenuGroup>
          {comment.commentedUser._id !== user?._id && (
            <>
              {!followedId?.includes(comment.commentedUser._id) ? (
                <>
                  <DropdownMenuItem
                    className=" cursor-pointer"
                    onClick={() =>
                      handleFollow(
                        comment.commentedUser._id,
                        comment.commentedUser.userName
                      )
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
                      handleFollow(
                        comment.commentedUser._id,
                        comment.commentedUser.userName
                      )
                    }
                  >
                    <UserMinus className="mr-2" size={20} />
                    <span style={{ whiteSpace: "nowrap" }}>
                      Unfollow{" "}
                      <span className=" text-[13px]">
                        ${comment.commentedUser.userName}
                      </span>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
            </>
          )}
          {comment.commentedUser._id === user?._id && (
            <>
              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={() => {
                  setActiveType("edit-comment");
                  setContent((prev) => ({
                    ...prev,
                    new: comment.content,
                    edit: comment,
                  }));
                }}
              >
                <FileSignature className="mr-2 " size={20} />
                <span>Edit Comment</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem className=" cursor-pointer">
            <Flag className=" mr-2" size={20} color="rgba(239, 68, 68, 0.75)" />
            <span style={{ color: "rgba(239,68,68, 0.75)" }}>
              Report Comment
            </span>
          </DropdownMenuItem>
          {comment.commentedUser._id === user?._id && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className=" bg-red-500 cursor-pointer"
                onClick={() => {
                  const type = comment.commentId ? "child" : "parent";
                  setState((prev) => ({
                    ...prev,
                    open: `${comment._id}-comment-${type}`,
                  }));
                  setActiveType("alert-delete");
                }}
              >
                <Trash2 className=" mr-2" size={20} />
                <span>Delete Comment</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentDropdown;
