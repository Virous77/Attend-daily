import { Like, Post } from "@/types/types";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Avatar,
  CardFooter,
} from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import { formatTimeAgo } from "@/utils/utils";
import { BsThreeDots } from "react-icons/bs";
import PostAction from "./postAction";
import PostImages from "./post-images";
import PostVideos from "./post-videos";

export type PostListProps = {
  post: Post & { like: Like };
};
const PostList: React.FC<PostListProps> = ({ post }) => {
  const {
    state: { user },
  } = useAppContext();
  return (
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
        <div>
          <BsThreeDots size={20} cursor="pointer" />
        </div>
      </CardHeader>
      <CardBody className=" p-0 pt-5">
        <p>{post.title}</p>

        <PostImages image={post.image} />
        <PostVideos video={post.video} />
      </CardBody>
      <CardFooter className="p-0 pt-2">
        <PostAction post={post} />
      </CardFooter>
    </Card>
  );
};

export default PostList;
