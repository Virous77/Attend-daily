import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function get() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("attend");
  return cookie;
}

import React from "react";
const Root = async () => {
  const value = await get();
  if (value?.value) return redirect("/feed");

  return <div>cool</div>;
};

export default Root;
