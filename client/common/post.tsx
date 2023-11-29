"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import React from "react";
import Author from "./author";
import PostImages from "./post-images";
import PostVideos from "./post-videos";
import PostAction from "./postAction";
import { response } from "@/components/feed/feed";
import PollComp from "@/components/poll/poll";
import { Repeat2 } from "lucide-react";
import { useAppContext } from "@/store/useAppContext";
import { useRouter } from "next/navigation";

export type PostProps = {
  post: response;
};

const PostCommon: React.FC<PostProps> = ({ post }) => {
  const {
    state: { user },
  } = useAppContext();
  const name = post?.userId._id === user?._id ? "You" : post.userId.name;
  const router = useRouter();
  return (
    <Card className=" p-4 cursor-pointer" style={{ margin: "2px" }}>
      {post.isRetweeted && (
        <div className=" flex items-center gap-2 pl-8 pb-1 opacity-60 text-[13px]">
          <Repeat2 size={18} />
          <span onClick={() => router.push(`/profile/${post.userId.userName}`)}>
            {name} reposted
          </span>
        </div>
      )}
      <Author post={post} />
      <CardBody className=" p-0 pt-5">
        {post?.title && <p>{post?.title}</p>}

        <PostImages image={post.image} />
        <PostVideos video={post.video} />

        {post.poll && <PollComp poll={post.poll} />}
      </CardBody>
      <CardFooter className="p-0 pt-4">
        <PostAction post={post} />
      </CardFooter>
    </Card>
  );
};

export default PostCommon;
