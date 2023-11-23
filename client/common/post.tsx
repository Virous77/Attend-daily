"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import React from "react";
import Author from "./author";
import PostImages from "./post-images";
import PostVideos from "./post-videos";
import PostAction from "./postAction";
import { response } from "@/components/feed/feed";
import PollComp from "@/components/poll/poll";

export type PostProps = {
  post: response;
};

const PostCommon: React.FC<PostProps> = ({ post }) => {
  return (
    <Card className=" p-4 cursor-pointer" style={{ margin: "2px" }}>
      <Author date={post.createdAt} user={post.userId} post={post} />
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
