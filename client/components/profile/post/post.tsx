import React from "react";
import PostList from "./postList";
import PullToRefresh from "react-simple-pull-to-refresh";
import Loader from "@/components/ui/loader/Loader";
import useQueryFetch from "@/hooks/useQueryFetch";
import { PostQueryResponse } from "@/components/feed/feed";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";

type PostProps = {
  id: string;
};

const Post: React.FC<PostProps> = ({ id }) => {
  const { invalidateKey } = useQueryInvalidate();
  const { fetchResult }: PostQueryResponse = useQueryFetch({
    endPoints: `post/all/${id}`,
    key: `${id}-post`,
    staleTime: 5 * 60 * 1000,
    enabled: id ? true : false,
  });

  const handleRefresh = async () => {
    invalidateKey(`${id}-post`);
  };

  return (
    <section>
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
    </section>
  );
};

export default Post;
