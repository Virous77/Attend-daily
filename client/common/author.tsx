"use client";

import { Avatar, CardHeader } from "@nextui-org/react";
import React from "react";
import { formatTimeAgo } from "@/utils/utils";
import Dropdown from "@/components/ui/custom/dropdown";
import { useRouter } from "next/navigation";
import { PostProps } from "./post";

type AuthorType = PostProps & {
  isActive?: boolean;
};

const Author: React.FC<AuthorType> = ({ post, isActive = true }) => {
  const router = useRouter();

  const user = post.isRetweeted ? post.originalPost.userId : post.userId;
  return (
    <CardHeader className="flex items-start justify-between p-0">
      <div className="flex items-center gap-5">
        <Avatar
          src={user?.image}
          isBordered={true}
          color="default"
          onClick={() => {
            if (isActive) {
              router.push(`/profile/${user.userName}`);
            }
          }}
          name={user.name}
          showFallback={true}
        />
        <div className="flex flex-col gap-1">
          <p
            className=" leading-none text-[15px]"
            onClick={() => router.push(`/profile/${user.userName}`)}
          >
            {user?.name}
          </p>
          <span className="opacity-60" style={{ fontSize: "13px" }}>
            {formatTimeAgo(new Date(post.createdAt))}
          </span>
        </div>
      </div>

      {isActive && <Dropdown post={post} />}
    </CardHeader>
  );
};

export default Author;
