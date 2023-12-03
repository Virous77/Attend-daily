import Author from "@/common/author";
import PostImages from "@/common/post-images";
import PostVideos from "@/common/post-videos";
import { Card, CardBody } from "@nextui-org/react";
import PollComp from "../poll/poll";
import { CompletePost } from "@/types/types";
import { useRouter } from "next/navigation";

type PostContentType = {
  post: CompletePost | null | any;
  isActive?: boolean;
};

const RePostContent: React.FC<PostContentType> = ({
  post,
  isActive = false,
}) => {
  const router = useRouter();
  if (!post) return;
  return (
    <div className="mt-4 w-full">
      <Card className=" p-4 cursor-pointer shadow-none border">
        <Author post={post} isActive={false} />
        <CardBody className=" p-0 pt-5">
          <div
            onClick={() => {
              if (isActive) {
                router.push(`/post/${post._id}`);
              }
            }}
          >
            {post?.title && <p>{post?.title}</p>}

            <PostImages image={post.image} />
            <PostVideos video={post.video} />

            {post.poll && <PollComp poll={post.poll} isActive={false} />}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RePostContent;
