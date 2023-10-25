import { get } from "@/app/layout";
import { redirect } from "next/navigation";
import React from "react";
import Cover from "@/components/profile/cover";
import UserData from "@/components/profile/userData";

const Profile = async () => {
  const value = await get();

  if (!value?.value) return redirect("/");
  return (
    <main>
      <section className="relative">
        <Cover />
        <UserData />
      </section>
    </main>
  );
};

export default Profile;
