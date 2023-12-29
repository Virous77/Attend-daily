import { Separator } from "@/components/ui/separator";
import { MainComments } from "@/types/types";
import { User } from "@nextui-org/react";
import CommentAction from "./commentAction";
import { useRouter } from "next/navigation";
import CommentDropdown from "@/components/ui/custom/comment-dropdown";
import { useAppContext } from "@/store/useAppContext";

export type CommentProps = {
  comment: MainComments;
  type: string;
};

const MainCommentList: React.FC<CommentProps> = ({ comment, type }) => {
  const router = useRouter();
  const { tempComment } = useAppContext();

  return (
    <ul
      className=" mt-4 flex flex-col gap-4  "
      style={{ opacity: tempComment ? 0.4 : 1 }}
    >
      <div className=" cursor-pointer">
        <div className=" flex items-start justify-between">
          <User
            name={comment.commentedUser.name}
            avatarProps={{ src: comment.commentedUser.image }}
            description={`@${comment.commentedUser.userName}`}
            onClick={() =>
              router.push(`/profile/${comment.commentedUser.userName}`)
            }
          />

          <CommentDropdown comment={comment} />
        </div>

        <p
          style={{ paddingLeft: "3rem" }}
          className=" mt-2"
          onClick={() => router.push(`/comment/${type}/${comment._id}`)}
        >
          {comment.content}
        </p>
      </div>
      <CommentAction comment={comment} type={type} />
      <Separator className=" -mt-2" />
    </ul>
  );
};

export default MainCommentList;
