import { Notification, QueryData, User } from "@/types/types";
import { getServerData, putServerData } from "@/api/server-api";
import Header from "@/common/header";
import noNotification from "../../public/notification.svg";
import { Image } from "@nextui-org/react";
import { revalidateTag } from "next/cache";
import NotificationWrap from "./notification-wrap";

type NotificationType = {
  user: User;
};

export type Response = QueryData & {
  data: {
    fresh: Notification[];
    viewed: Notification[];
  };
};

const NotificationComp: React.FC<NotificationType> = async ({ user }) => {
  const notification: Response = await getServerData({
    endpoint: "notification",
    tag: "notification",
    cacheType: false,
  });

  const freshId = notification.data.fresh.map((data) => data._id);

  if (freshId.length > 0) {
    await putServerData({
      endpoint: "notification",
      params: { notificationIds: freshId },
    });
  }

  const totalLength =
    notification.data.fresh.length + notification.data.viewed.length;

  const handleRefresh = async () => {
    "use server";
    revalidateTag("notification");
  };

  return (
    <main>
      <Header name="Notification" />
      {totalLength > 0 ? (
        <NotificationWrap
          handleRefresh={handleRefresh}
          notification={notification}
        />
      ) : (
        <div className=" h-screen flex items-center justify-center">
          <Image
            src={noNotification.src}
            alt="notification"
            placeholder="blur"
            width={250}
            height={250}
          />
        </div>
      )}
    </main>
  );
};

export default NotificationComp;
