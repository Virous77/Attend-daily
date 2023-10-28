"use client";
import React, { useState } from "react";
import { useAppContext } from "@/store/useAppContext";
import { Avatar } from "@nextui-org/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import EditProfile from "./editProfile";
import { User } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import Content from "./content";
import { useUserContext } from "@/store/useUserContext";

export type StateType = {
  name: string;
  image: string | ArrayBuffer;
  bio: string;
  email: string;
  active: boolean;
  previewImage: string;
};

const UserData = () => {
  const { state, isPending } = useAppContext();
  const [open, setOpen] = useState<StateType>({
    image: "",
    name: "",
    bio: "",
    email: "",
    active: false,
    previewImage: "",
  });
  const { networkData } = useUserContext();

  const handleSetUserState = (user: User | null) => {
    if (!user) return;
    setOpen((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
      bio: user.bio,
      active: true,
      image: "",
      previewImage: user.image,
    }));
  };

  return (
    <div className="p-5 absolute w-full top-[160px] z-[3] rounded-t-3xl bg-background">
      <div className="flex items-center justify-between">
        <div className="-mt-[60px]">
          <Avatar
            isBordered
            color="secondary"
            src={state.user?.image}
            className="w-[85px] h-[85px]"
          />
        </div>

        <button
          className="pl-1 w-8 h-8 rounded-full bg-accent  hover:bg-foreground hover:text-accent flex items-center justify-center"
          onClick={() => handleSetUserState(state.user)}
          disabled={!state.user}
        >
          <MdOutlineModeEditOutline size={22} />
        </button>
      </div>
      <div className="mt-6 flex items-start justify-between">
        <div className="flex flex-col">
          {state.user?.userName ? (
            <b className="text-bold text-xl">{state.user?.userName}</b>
          ) : (
            <Skeleton className=" mt-3 h-4 w-[100px]" />
          )}
          {state.user?.name ? (
            <span className="text-[14px] opacity-75">{state.user?.name}</span>
          ) : (
            <Skeleton className=" mt-3 h-3 w-[120px]" />
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className=" flex flex-col  items-end">
            <b>{networkData?.data?.followers.length || 0}</b>
            <span className=" text-[14px] opacity-75">Followers</span>
          </div>

          <div className=" flex flex-col items-end">
            <b>{networkData?.data?.following.length || 0}</b>
            <span className=" text-[14px] opacity-75">Following</span>
          </div>
        </div>
      </div>

      {state.user?.bio || !isPending ? (
        <p className=" mt-3 text-[14px] opacity-75">{state.user?.bio}</p>
      ) : (
        <Skeleton className=" mt-[18px] h-3 w-[150px]" />
      )}
      <Content />
      <EditProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserData;
