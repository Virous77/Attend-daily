"use client";

import PullToRefresh from "react-simple-pull-to-refresh";
import Loader from "../ui/loader/Loader";
import NotificationList from "./notification-list";
import { Separator } from "../ui/separator";
import React from "react";
import { Response } from "./notification";

type NotificationType = {
  handleRefresh: () => Promise<any>;
  notification: Response;
};

const NotificationWrap: React.FC<NotificationType> = ({
  handleRefresh,
  notification,
}) => {
  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      pullingContent={<Loader />}
      fetchMoreThreshold={3}
      className=" mt-12"
    >
      <>
        {notification.data.fresh.length > 0 && (
          <section className="p-3">
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

            <section className={`mt-2 p-3`}>
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
    </PullToRefresh>
  );
};

export default NotificationWrap;
