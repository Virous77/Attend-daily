import { Separator } from "@/components/ui/separator";
import { MainComments } from "@/types/types";
import { User } from "@nextui-org/react";
import CommentAction from "./commentAction";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";

export type CommentProps = {
  comment: MainComments;
  type: string;
};

const MainCommentList: React.FC<CommentProps> = ({ comment, type }) => {
  const router = useRouter();
  return (
    <ul className=" mt-4 flex flex-col gap-4">
      <div
        onClick={() => router.push(`/comment/${type}/${comment._id}`)}
        className=" cursor-pointer"
      >
        <div className=" flex items-start justify-between">
          <User
            name={comment.commentedUser.name}
            avatarProps={{ src: comment.commentedUser.image }}
            description={`@${comment.commentedUser.userName}`}
          />

          <BsThreeDots
            size={20}
            cursor="pointer"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          />
        </div>

        <p className=" pl-12">{comment.content}</p>
      </div>
      <CommentAction comment={comment} type={type} />
      <Separator className=" -mt-2" />
    </ul>
  );
};

export default MainCommentList;
