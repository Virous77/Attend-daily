"use client";

import { Avatar, CardHeader } from "@nextui-org/react";
import React from "react";
import { formatTimeAgo } from "@/utils/utils";
import { MainComments, User } from "@/types/types";
import { useRouter } from "next/navigation";
import CommentDropdown from "@/components/ui/custom/comment-dropdown";

type AuthorProps = {
  data: MainComments;
};

const CommentAuthor: React.FC<AuthorProps> = ({ data }) => {
  const router = useRouter();
  return (
    <CardHeader className="flex items-start justify-between p-0">
      <div className="flex items-center gap-5">
        <Avatar
          src={data.commentedUser?.image}
          isBordered={true}
          color="default"
          onClick={() => router.push(`/profile/${data.commentedUser.userName}`)}
          showFallback={true}
          name={data.commentedUser.name}
        />
        <div className="flex flex-col gap-1">
          <p className=" pl-0 leading-none text-[15px]">
            {data.commentedUser?.name}
          </p>
          <span className="text-[12px] opacity-60">
            {formatTimeAgo(new Date(data.createdAt))}
          </span>
        </div>
      </div>
      <CommentDropdown comment={data} />
    </CardHeader>
  );
};

export default CommentAuthor;
