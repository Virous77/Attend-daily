import React from "react";
import { get } from "../page";
import { redirect } from "next/navigation";

const Feed = async () => {
  const value = await get();

  if (!value?.value) return redirect("/");
  return <div>Feed</div>;
};

export default Feed;
