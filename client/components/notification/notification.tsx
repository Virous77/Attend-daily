import { User } from "@/types/types";
import { getServerData } from "@/api/server-api";

type NotificationType = {
  user: User;
};

const NotificationComp: React.FC<NotificationType> = async ({ user }) => {
  const notification = await getServerData({
    url: "http://localhost:4000/api/v1/notification",
    tag: "notification",
  });

  console.log(notification);

  return <div>NotificationComp</div>;
};

export default NotificationComp;
