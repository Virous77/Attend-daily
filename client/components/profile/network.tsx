import { UserNetwork } from "@/types/types";
import React from "react";
import { useAppContext } from "@/store/useAppContext";
import Followers from "./followers";

type NetworkType = {
  isOtherUserMount: boolean;
  data: UserNetwork;
  userData: UserNetwork | null;
};

const Network: React.FC<NetworkType> = ({
  isOtherUserMount,
  data,
  userData,
}) => {
  const { setState } = useAppContext();
  return (
    <div className="flex items-center gap-4">
      <div className=" flex flex-col  items-end">
        <b>
          {isOtherUserMount
            ? data?.followers.length
            : userData?.followers.length || 0}
        </b>
        <span
          className=" text-[14px] opacity-75 cursor-pointer"
          onClick={() =>
            setState((prev) => ({ ...prev, open: "followers", support: "" }))
          }
        >
          Followers
        </span>
      </div>

      <div className=" flex flex-col items-end">
        <b>
          {isOtherUserMount
            ? data?.following.length
            : userData?.following.length || 0}
        </b>
        <span
          className=" text-[14px] opacity-75 cursor-pointer"
          onClick={() =>
            setState((prev) => ({ ...prev, open: "following", support: "" }))
          }
        >
          Following
        </span>
      </div>
      <Followers userData={userData} otherUserData={data} />
    </div>
  );
};

export default Network;
