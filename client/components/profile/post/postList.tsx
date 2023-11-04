import { Like, Post } from "@/types/types";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  CardFooter,
} from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import { formatTimeAgo } from "@/utils/utils";
import PostAction from "./postAction";
import PostImages from "./post-images";
import PostVideos from "./post-videos";
import Dropdown from "@/components/ui/custom/dropdown";
import Comment from "./comment";

export type PostListProps = {
  post: Post & { like: Like };
};

export type StateType = {
  post: (Post & { like: Like }) | null;
  active: boolean;
};
const PostList: React.FC<PostListProps> = ({ post }) => {
  const {
    state: { user },
  } = useAppContext();
  const [open, setOpen] = useState<StateType>({
    post: null,
    active: false,
  });

  return (
    <>
      <Card className=" p-4" shadow="sm">
        <CardHeader className="flex items-start justify-between p-0">
          <div className="flex items-center gap-5">
            <Avatar src={user?.image} isBordered={true} color="default" />
            <div className="flex flex-col gap-1">
              <p className=" leading-none">{user?.name}</p>
              <span className="text-[13px] opacity-60">
                {formatTimeAgo(new Date(post.createdAt))}
              </span>
            </div>
          </div>

          <Dropdown />
        </CardHeader>
        <CardBody className=" p-0 pt-5">
          <p>{post.title}</p>

          <PostImages image={post.image} />
          <PostVideos video={post.video} />
        </CardBody>
        <CardFooter className="p-0 pt-2">
          <PostAction post={post} setOpen={setOpen} />
        </CardFooter>
      </Card>
      <Comment open={open} setOpen={setOpen} />
    </>
  );
};

export default PostList;
