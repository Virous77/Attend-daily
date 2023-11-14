"use client";
import React, { useState } from "react";
import { useAppContext } from "@/store/useAppContext";
import { Avatar } from "@nextui-org/react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import EditProfile from "./editProfile";
import { Skeleton } from "../ui/skeleton";
import Content from "./content";
import { useUserContext } from "@/store/useUserContext";
import useQueryFetch from "@/hooks/useQueryFetch";
import { useParams } from "next/navigation";
import { QueryData, QueryResponse, User, UserNetwork } from "@/types/types";

type Response = QueryResponse & {
  fetchResult: QueryData & {
    data: User;
  };
};

type NetworkResponse = QueryResponse & {
  fetchResult: QueryData & {
    data: UserNetwork;
  };
};

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
  const { name }: { name: string } = useParams();
  const { fetchResult, isPending: isLoading }: Response = useQueryFetch({
    endPoints: `profile/${name}`,
    key: `${name}-user`,
    staleTime: 5 * 60 * 1000,
  });

  const isOtherUserMount = state.user?.userName !== name ? true : false;

  const { fetchResult: otherUserNetworkData }: NetworkResponse = useQueryFetch({
    endPoints: `user/network/${name}`,
    key: `${name}-userNetwork`,
    staleTime: 5 * 60 * 1000,
    enabled: isOtherUserMount && state.user?.token ? true : false,
  });

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
            className="w-[85px] h-[85px]"
            showFallback={true}
            name={fetchResult.data.name}
          />
        </div>

        {fetchResult.data._id === state.user?._id && (
          <button
            className="pl-1 w-8 h-8 rounded-full bg-accent  hover:bg-foreground hover:text-accent flex items-center justify-center"
            onClick={() => handleSetUserState(fetchResult.data)}
            disabled={!fetchResult.data}
          >
            <MdOutlineModeEditOutline size={22} />
          </button>
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

        <div className="flex items-center gap-4">
          <div className=" flex flex-col  items-end">
            <b>
              {isOtherUserMount
                ? otherUserNetworkData?.data?.followers.length
                : networkData?.data?.followers.length || 0}
            </b>
            <span className=" text-[14px] opacity-75">Followers</span>
          </div>

          <div className=" flex flex-col items-end">
            <b>
              {isOtherUserMount
                ? otherUserNetworkData?.data?.following.length
                : networkData?.data?.following.length || 0}
            </b>
            <span className=" text-[14px] opacity-75">Following</span>
          </div>
        </div>
      </div>

      {fetchResult.data?.bio || !isPending ? (
        <p className=" mt-3 text-[14px] opacity-75">{fetchResult.data?.bio}</p>
      ) : (
        <Skeleton className=" mt-[18px] h-3 w-[150px]" />
      )}
      <Content id={fetchResult.data._id} />
      <EditProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserData;
