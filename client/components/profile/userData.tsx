"use client";
import React, { useState } from "react";
import { useAppContext } from "@/store/useAppContext";
import { Avatar } from "@nextui-org/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import EditProfile from "./editProfile";
import { User } from "@/types/types";

export type StateType = {
  name: string;
  image: File | null;
  bio: string;
  email: string;
  active: boolean;
  previewImage: string;
};

const UserData = () => {
  const { state } = useAppContext();
  const [open, setOpen] = useState<StateType>({
    image: null,
    name: "",
    bio: "",
    email: "",
    active: false,
    previewImage: "",
  });

  const handleSetUserState = (user: User | null) => {
    if (!user) return;
    setOpen((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
      bio: user.bio,
      active: true,
      image: null,
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
      <EditProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserData;
