"use client";

import React from "react";
import SelectComp from "../ui/custom/select";
import { useAppContext } from "@/store/useAppContext";
import { usePathname } from "next/navigation";

const FeedType = () => {
  const { setState, state } = useAppContext();
  const pathName = usePathname();

  const data = ["Home Feed", "Posts", "Polls"];

  if (pathName === "/") return null;

  return (
    <SelectComp
      value={state.feedType}
      onChange={(e) => {
        localStorage.setItem("feedType", JSON.stringify(e));
        setState((prev) => ({ ...prev, feedType: e }));
      }}
      data={data}
      placeHolder="Feed"
      className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600 w-fit focus:ring-0 focus:ring-offset-0"
    />
  );
};

export default FeedType;
