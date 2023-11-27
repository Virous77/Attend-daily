import { Notification } from "@/types/types";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

type NotificationType = {
  data: Notification;
};

const NotificationList: React.FC<NotificationType> = ({ data }) => {
  return (
    <Card>
      <CardBody className=" pt-[10px] pb-[10px]">
        <Link href={`/profile/${data.notificationBy.userName}`}>
          <Avatar
            name={data.notificationBy.name}
            src={data.notificationBy.image}
          />
        </Link>

        <div className=" flex items-center gap-1 mt-1">
          <span className=" text-[17px] font-bold">
            {data.notificationBy.name}
          </span>
          <span className=" text-[15px]">{data.message}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default NotificationList;
