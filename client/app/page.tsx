import { redirect } from "next/navigation";
import { get } from "./layout";
import GlobalPost from "@/components/addPost/global-button";

import React from "react";
const Root = async () => {
  const value = await get();

  if (value?.value) return redirect("/feed");

  return (
    <main>
      <p>cool</p>
    </main>
  );
};

export default Root;
