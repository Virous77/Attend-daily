import { Separator } from "@/components/ui/separator";
import { CommentReplies, MainComments } from "@/types/types";
import { User } from "@nextui-org/react";
import CommentAction from "./commentAction";
import { BsThreeDots } from "react-icons/bs";
import RepliesAction from "./repliesAction";

export type CommentProps = {
  comment: MainComments;
  setComment: React.Dispatch<
    React.SetStateAction<{
      comment: string;
      commentReplies: boolean;
      commentId: string;
    }>
  >;
};

const MainCommentList: React.FC<
  CommentProps & { commentReplies: CommentReplies[] }
> = ({ comment, setComment, commentReplies }) => {
  return (
    <ul className=" mt-4 flex flex-col gap-4">
      <div>
        <div className=" flex items-start justify-between">
          <User
            name={comment.commentedUser.name}
            avatarProps={{ src: comment.commentedUser.image }}
            description={`@${comment.commentedUser.userName}`}
          />

          <BsThreeDots size={20} cursor="pointer" />
        </div>

        <p className=" pl-12">{comment.content}</p>
      </div>
      <CommentAction comment={comment} setComment={setComment} />
      {commentReplies.length > 0 && (
        <div className=" flex flex-col gap-4 bg-accent p-2 rounded">
          {commentReplies.map((reply) => (
            <div key={reply._id}>
              <User
                className=" pl-1"
                classNames={{ name: " text-[13px]" }}
                name={reply.commentedUser.name}
                avatarProps={{
                  src: reply.commentedUser.image,
                  style: { width: "30px", height: "30px" },
                }}
                description={`@${reply.commentedUser.userName}`}
              />
              <p className=" pl-11 text-[14px]">{reply.content}</p>
              <RepliesAction comment={reply} />
            </div>
          ))}
        </div>
      )}
      <Separator className=" -mt-2" />
    </ul>
  );
};

export default MainCommentList;
