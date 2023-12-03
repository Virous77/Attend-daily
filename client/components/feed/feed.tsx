"use client";

import useQueryFetch from "@/hooks/useQueryFetch";
import { CompletePost, QueryData, QueryResponse } from "@/types/types";
import PullToRefresh from "react-simple-pull-to-refresh";
import Loader from "../ui/loader/Loader";
import PostList from "../profile/post/postList";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { useAppContext } from "@/store/useAppContext";

export type response = CompletePost;

type PostDataType = QueryData & {
  data: response[] | null;
};

export type PostQueryResponse = QueryResponse & {
  fetchResult: PostDataType;
};

const FeedComp = () => {
  const { state } = useAppContext();
  const { fetchResult, isPending }: PostQueryResponse = useQueryFetch({
    endPoints: `feed/post?type=${state.feedType}`,
    key: `feed${state.feedType}`,
    staleTime: Infinity,
    enabled: true,
  });
  const { invalidateKey } = useQueryInvalidate();

  const handleRefresh = async () => {
    invalidateKey(`feed${state.feedType}`);
  };

  if (isPending) return <p>Loading....</p>;
  return (
    <main className="p-4 pb-20 pt-0">
      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent={<Loader />}
        fetchMoreThreshold={3}
      >
        <ul className="flex flex-col gap-4 mt-1">
          {fetchResult?.data &&
            fetchResult.data.map((post) => (
              <PostList post={post} key={post._id} />
            ))}
        </ul>
      </PullToRefresh>
    </main>
  );
};

export default FeedComp;
