"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import React from "react";
import Author from "./author";
import PostImages from "./post-images";
import PostVideos from "./post-videos";
import PostAction from "./postAction";
import { response } from "@/components/feed/feed";

type PostProps = {
  post: response;
};

const PostCommon: React.FC<PostProps> = ({ post }) => {
  return (
    <Card className=" p-4 cursor-pointer" shadow="sm">
      <div>
        <Author date={post.createdAt} user={post.userId} />
        <CardBody className=" p-0 pt-5">
          {post?.title && <p>{post?.title}</p>}

          <PostImages image={post.image} />
          <PostVideos video={post.video} />
        </CardBody>
        <CardFooter className="p-0 pt-4">
          <PostAction post={post} />
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCommon;
