import { Notification, QueryData, User } from "@/types/types";
import { getServerData, putServerData } from "@/api/server-api";
import Header from "@/common/header";
import NotificationList from "./notification-list";
import { Separator } from "../ui/separator";
import noNotification from "../../public/notification.svg";
import { Image } from "@nextui-org/react";

type NotificationType = {
  user: User;
};

type Response = QueryData & {
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

  return (
    <main>
      <Header name="Notification" />
      {totalLength > 0 ? (
        <>
          {notification.data.fresh.length > 0 && (
            <section className=" mt-12 p-3">
              <h1 className="text-green-500 text-[20px] pb-1">New</h1>
              <div className=" flex flex-col gap-2">
                {notification.data.fresh.map((data) => (
                  <NotificationList data={data} key={data._id} />
                ))}
              </div>
            </section>
          )}
          {notification.data.viewed.length > 0 && (
            <>
              <Separator />
              <section
                className={` ${
                  notification.data.fresh.length > 0 ? "mt-2" : "mt-12"
                } p-3`}
              >
                <h1 className="text-green-500 text-[20px] pb-1">Viewed</h1>
                <div className=" flex flex-col gap-2">
                  {notification.data.viewed.map((data) => (
                    <NotificationList data={data} key={data._id} />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
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
