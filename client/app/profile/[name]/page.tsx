import { get } from "@/app/layout";
import { redirect } from "next/navigation";
import React from "react";

const Profile = async () => {
  const value = await get();

  if (!value?.value) return redirect("/");
  return <div>Profile</div>;
};

export default Profile;
