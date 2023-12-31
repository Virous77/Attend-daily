"use client";

import { CompletePost, QueryData, QueryResponse } from "@/types/types";
import Header from "../../common/header";
import PostCommon from "@/common/post";
import Comment from "./post-comment";
import { Separator } from "../ui/separator";
import CommentForm from "../../common/commentForm";
import useQueryFetch from "@/hooks/useQueryFetch";
import { FeedSkeleton, PostNotFound } from "../skeleton/skeleton";
import { useAppContext } from "@/store/useAppContext";

type PostProps = {
  id: string;
};

type Response = QueryResponse & {
  fetchResult: QueryData & {
    data: CompletePost;
  };
};

const SinglePost: React.FC<PostProps> = ({ id }) => {
  const {
    state: { user },
  } = useAppContext();
  const { fetchResult, isLoading }: Response = useQueryFetch({
    endPoints: `post/${id}`,
    key: `${id}-post`,
    enabled: true,
  });

  if (!fetchResult?.data && !isLoading) return <PostNotFound />;

  return (
    <main>
      <Header name="Post" />

      {isLoading ? (
        <div className="  pt-14 p-4 ">
          <FeedSkeleton />
        </div>
      ) : (
        <>
          <section className=" pt-16 p-4">
            <PostCommon post={fetchResult?.data} />
          </section>
        </>
      )}
      <Separator />
      <Comment postId={fetchResult?.data?._id} />
      {!isLoading && user?.token && <CommentForm postId={id} />}
    </main>
  );
};

export default SinglePost;
