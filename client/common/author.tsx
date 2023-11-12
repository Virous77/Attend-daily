"use client";

import { Avatar, CardHeader } from "@nextui-org/react";
import React from "react";
import { formatTimeAgo } from "@/utils/utils";
import Dropdown from "@/components/ui/custom/dropdown";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";

type AuthorProps = {
  date: string;
  user: User;
};

const Author: React.FC<AuthorProps> = ({ date, user }) => {
  const router = useRouter();
  return (
    <CardHeader className="flex items-start justify-between p-0">
      <div className="flex items-center gap-5">
        <Avatar
          src={user?.image}
          isBordered={true}
          color="default"
          onClick={() => router.push(`/profile/${user.userName}`)}
        />
        <div className="flex flex-col gap-1">
          <p className=" leading-none text-[15px]">{user?.name}</p>
          <span className="text-[12px] opacity-60">
            {formatTimeAgo(new Date(date))}
          </span>
        </div>
      </div>

      <Dropdown />
    </CardHeader>
  );
};

export default Author;
