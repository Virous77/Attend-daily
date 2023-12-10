import { get } from "@/app/layout";
import { redirect } from "next/navigation";
import React from "react";
import Cover from "@/components/profile/cover";
import UserData from "@/components/profile/userData";
import { getServerData } from "@/api/server-api";
import { CompletePost, QueryData } from "@/types/types";

type TResponse = QueryData & {
  data: CompletePost[];
};

const Profile = async () => {
  const value = await get();
  const pinPost: TResponse = await getServerData({
    endpoint: "pin",
    tag: "userPin",
  });

  if (!value?.value) return redirect("/");
  return (
    <main>
      <section className="relative">
        <Cover />
        <UserData pinPost={pinPost.data.length > 0 ? pinPost?.data[0] : null} />
      </section>
    </main>
  );
};

export default Profile;
