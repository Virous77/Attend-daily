"use client";
import React, { useState } from "react";
import { useAppContext } from "@/store/useAppContext";
import { Avatar, useDisclosure } from "@nextui-org/react";
import EditProfile from "./editProfile";
import { Skeleton } from "../ui/skeleton";
import Content from "./content";
import { useUserContext } from "@/store/useUserContext";
import useQueryFetch from "@/hooks/useQueryFetch";
import { useParams } from "next/navigation";
import {
  CompletePost,
  QueryData,
  QueryResponse,
  User,
  UserNetwork,
} from "@/types/types";
import Network from "./network";
import ProfileAction from "./profile-action";
import FullImage from "@/common/full-image";
import { Pencil } from "lucide-react";

type TResponse = QueryResponse & {
  fetchResult: QueryData & {
    data: User;
  };
};

type TNetworkResponse = QueryResponse & {
  fetchResult: QueryData & {
    data: UserNetwork;
  };
};

export type TState = {
  name: string;
  image: string | ArrayBuffer;
  bio: string;
  email: string;
  active: boolean;
  previewImage: string;
};

type TUserData = {
  pinPost: CompletePost | null;
};

const UserData: React.FC<TUserData> = ({ pinPost }) => {
  const { state, isPending } = useAppContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState<TState>({
    image: "",
    name: "",
    bio: "",
    email: "",
    active: false,
    previewImage: "",
  });
  const { networkData } = useUserContext();
  const { name }: { name: string } = useParams();
  const { fetchResult, isPending: isLoading }: TResponse = useQueryFetch({
    endPoints: `profile/${name}`,
    key: `${name}-user`,
    enabled: true,
  });

  const isOtherUserMount = state.user?.userName !== name ? true : false;

  const { fetchResult: otherUserNetworkData }: TNetworkResponse = useQueryFetch(
    {
      endPoints: `user/network/${name}`,
      key: `${name}-userNetwork`,
      enabled: isOtherUserMount ? true : false,
    }
  );

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

  if (isLoading) return <p>Loading....</p>;

  return (
    <div className="p-5 absolute w-full top-[160px] z-[3] rounded-t-3xl bg-background pb-20">
      <div className="flex items-center justify-between">
        <div className="-mt-[60px]">
          <Avatar
            isBordered
            color="secondary"
            src={fetchResult.data?.image}
            className="w-[85px] h-[85px] cursor-pointer"
            showFallback={true}
            name={fetchResult.data.name}
            onClick={() => {
              if (fetchResult.data.image) {
                onOpen();
              }
            }}
          />
        </div>

        {fetchResult.data._id === state.user?._id ? (
          <button
            className="pl-1 w-8 h-8 rounded-full bg-accent  hover:bg-foreground hover:text-accent flex items-center justify-center"
            onClick={() => handleSetUserState(fetchResult.data)}
            disabled={!fetchResult.data}
          >
            <Pencil size={22} />
          </button>
        ) : (
          <ProfileAction
            otherUserNetworkData={otherUserNetworkData?.data}
            userName={fetchResult?.data?.userName}
          />
        )}
      </div>
      <div className="mt-6 flex items-start justify-between">
        <div className="flex flex-col">
          {fetchResult.data?.userName ? (
            <b className="text-bold text-xl">{fetchResult.data?.userName}</b>
          ) : (
            <Skeleton className=" mt-3 h-4 w-[100px]" />
          )}
          {fetchResult.data?.name ? (
            <span className="text-[14px] opacity-75">
              {fetchResult.data?.name}
            </span>
          ) : (
            <Skeleton className=" mt-3 h-3 w-[120px]" />
          )}
        </div>

        <Network
          isOtherUserMount={isOtherUserMount}
          data={otherUserNetworkData?.data}
          userData={networkData?.data}
        />
      </div>

      {fetchResult.data?.bio || !isPending ? (
        <p className=" mt-3 text-[14px] opacity-75">{fetchResult.data?.bio}</p>
      ) : (
        <Skeleton className=" mt-[18px] h-3 w-[150px]" />
      )}
      <Content id={fetchResult.data._id} pinPost={pinPost} />
      <EditProfile open={open} setOpen={setOpen} />
      <FullImage
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        url={fetchResult.data.image}
        type="image"
      />
    </div>
  );
};

export default UserData;
