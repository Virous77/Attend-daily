import React from "react";
import { get } from "../layout";
import { redirect } from "next/navigation";

const Message = async () => {
  const value = await get();

  if (!value?.value) return redirect("/");

  return <div>Message</div>;
};

export default Message;
