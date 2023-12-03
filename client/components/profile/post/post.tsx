import React from "react";
import PostList from "./postList";
import PullToRefresh from "react-simple-pull-to-refresh";
import Loader from "@/components/ui/loader/Loader";
import useQueryFetch from "@/hooks/useQueryFetch";
import { PostQueryResponse } from "@/components/feed/feed";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import EmptyFeed from "../empty-feed";

type PostProps = {
  id: string;
};

const Post: React.FC<PostProps> = ({ id }) => {
  const { invalidateKey } = useQueryInvalidate();
  const { fetchResult, isPending }: PostQueryResponse = useQueryFetch({
    endPoints: `post/all/${id}`,
    key: `${id}-post`,
    enabled: id ? true : false,
  });

  const handleRefresh = async () => {
    invalidateKey(`${id}-post`);
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <section>
      {fetchResult.data && fetchResult?.data?.length > 0 ? (
        <PullToRefresh
          onRefresh={handleRefresh}
          pullingContent={<Loader />}
          fetchMoreThreshold={3}
        >
          <ul className="flex flex-col gap-4 mt-3">
            {fetchResult?.data &&
              fetchResult.data.map((post) => (
                <PostList post={post} key={post._id} />
              ))}
          </ul>
        </PullToRefresh>
      ) : (
        <EmptyFeed />
      )}
    </section>
  );
};

export default Post;
