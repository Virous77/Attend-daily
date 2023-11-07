import { Like, Post, QueryData } from "@/types/types";
import { getServerData } from "@/api/server-api";
import { revalidateTag } from "next/cache";
import Header from "../../common/header";
import HeaderChildren from "./headerChildren";
import PostCommon from "@/common/post";
import Comment from "./post-comment";
import { Separator } from "../ui/separator";
import CommentForm from "../../common/commentForm";

type PostProps = {
  id: string;
};

type Response = QueryData & {
  data: Post & { like: Like };
};

const fetchSinglePost = async (id: string) => {
  revalidateTag(`${id}-post`);
  const post: Response = await getServerData({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/post/${id}`,
    tag: `${id}-post`,
  });
  return post;
};

const SinglePost: React.FC<PostProps> = async ({ id }) => {
  const post = await fetchSinglePost(id);

  if (!post.status) return <p>Something went wrong, Try again later</p>;
  return (
    <main>
      <Header name="Post">
        <HeaderChildren />
      </Header>
      <section className=" pt-16 p-4">
        <PostCommon post={post.data} />
      </section>
      <Separator />
      <Comment postId={post.data._id} />
      <CommentForm postId={id} />
    </main>
  );
};

export default SinglePost;
