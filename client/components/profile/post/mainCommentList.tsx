import { Separator } from "@/components/ui/separator";
import { MainComments } from "@/types/types";
import { User } from "@nextui-org/react";
import CommentAction from "./commentAction";
import { BsThreeDots } from "react-icons/bs";

type CommentProps = {
  comment: MainComments;
};

const MainCommentList: React.FC<CommentProps> = ({ comment }) => {
  return (
    <ul className=" mt-4 flex flex-col gap-4">
      <div>
        <div className=" flex items-start justify-between">
          <User
            name={comment.commentedUser.name}
            avatarProps={{ src: comment.commentedUser.image }}
            description={comment.commentedUser.userName}
          />

          <BsThreeDots size={20} cursor="pointer" />
        </div>

        <p className=" pl-12">{comment.content}</p>
      </div>
      <CommentAction comment={comment} />
      <Separator className=" -mt-2" />
    </ul>
  );
};

export default MainCommentList;
