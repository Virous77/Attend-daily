import { Post } from "@/types/types";
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

export type PostListProps = {
  post: Post;
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

        {post.image.length > 0 && (
          <div>
            <ul className=" grid grid-cols-2 gap-2 mt-2">
              {post.image.map((img) => (
                <Image
                  src={img}
                  alt={post.title}
                  key={img}
                  width="100%"
                  height="100%"
                  className=" max-h-96 cursor-pointer hover:scroll-smooth"
                  shadow="sm"
                />
              ))}
            </ul>
          </div>
        )}
      </CardBody>
      <CardFooter className="p-0 pt-2">
        <PostAction post={post} />
      </CardFooter>
    </Card>
  );
};

export default PostList;
