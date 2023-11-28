import { Notification } from "@/types/types";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { Repeat2, UserPlus, Vote } from "lucide-react";
import Link from "next/link";
import { AiTwotoneHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

type NotificationType = {
  data: Notification;
};

const NotificationList: React.FC<NotificationType> = ({ data }) => {
  const url =
    data.notificationRef === null
      ? `/profile/${data.notificationBy.userName}`
      : data.notificationRef._id &&
        !data.notificationRef.commentId &&
        !data.notificationRef.postId
      ? `/post/${data.notificationRef._id}`
      : data.notificationRef._id &&
        data.notificationRef.postId &&
        !data.notificationRef.commentId
      ? `/comment/p/${data.notificationRef._id}`
      : data.notificationRef._id &&
        data.notificationRef.postId &&
        data.notificationRef.commentId
      ? `/comment/c/${data.notificationRef._id}`
      : "";

  return (
    <Card>
      <CardBody className=" pt-[10px] pb-[10px]">
        <div className=" flex  gap-4 items-center">
          {data.notificationEvent === "follow" && <UserPlus size={17} />}
          {data.notificationEvent === "like" && (
            <AiTwotoneHeart size={18} color="red" />
          )}
          {data.notificationEvent === "poll" && (
            <Vote size={17} color="green" />
          )}
          {data.notificationEvent === "comment" && <FaRegComment size={18} />}
          {data.notificationEvent === "commentReplies" && (
            <FaRegComment size={18} />
          )}
          {data.notificationEvent === "repost" && <Repeat2 color="green" />}
          <div className=" flex items-center gap-2">
            <Link href={`/profile/${data.notificationBy.userName}`}>
              <Avatar
                name={data.notificationBy.name}
                src={data.notificationBy.image}
              />
            </Link>

            <Link href={url}>
              <div className=" flex items-center gap-1 mt-1">
                <span className=" text-[17px] font-bold">
                  {data.notificationBy.name}
                </span>
                <span className=" text-[15px]">{data.message}</span>
              </div>
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default NotificationList;
