import { redirect } from "next/navigation";
import { get } from "./layout";

import React from "react";
const Root = async () => {
  const value = await get();

  if (value?.value) return redirect("/feed");

  return <div>cool</div>;
};

export default Root;
