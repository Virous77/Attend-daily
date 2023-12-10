"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import React from "react";
import Author from "./author";
import PostImages from "./post-images";
import PostVideos from "./post-videos";
import PostAction from "./postAction";
import PollComp from "@/components/poll/poll";
import { Pin, Repeat2 } from "lucide-react";
import { useAppContext } from "@/store/useAppContext";
import { useRouter } from "next/navigation";
import RePostContent from "@/components/addPost/repost-content";
import { CompletePost } from "@/types/types";

export type PostProps = {
  post: CompletePost;
  type?: string;
};

const PostCommon: React.FC<PostProps> = ({ post, type }) => {
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

      {type === "profile" && (
        <div className=" flex items-center gap-2 pl-8 pb-2">
          <Pin color="green" size={19} />{" "}
          <span className="text-[13px]">Pinned Post</span>
        </div>
      )}
      <Author post={post} />
      <CardBody className=" p-0 pt-5">
        {post?.title && <p>{post?.title}</p>}

        <PostImages image={post.image} />
        <PostVideos video={post.video} />
        {post.quotePostId && (
          <RePostContent post={post.quotePostId} isActive={true} />
        )}
        {post.poll && <PollComp poll={post.poll} />}
      </CardBody>
      <CardFooter className="p-0 pt-4">
        <PostAction post={post} />
      </CardFooter>
    </Card>
  );
};

export default PostCommon;
