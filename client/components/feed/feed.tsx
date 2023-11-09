"use client";

import useQueryFetch from "@/hooks/useQueryFetch";
import { Like, Post, QueryData, QueryResponse } from "@/types/types";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../ui/loader/Loader";
import PostList from "../profile/post/postList";

export type response = Post & { like: Like } & {
  userId: {
    _id: string;
    name: string;
    image: string;
    userName: string;
  };
};

type PostDataType = QueryData & {
  data: response[] | null;
};

export type PostQueryResponse = QueryResponse & {
  fetchResult: PostDataType;
};

const FeedComp = () => {
  const client = useQueryClient();
  const { fetchResult, isPending }: PostQueryResponse = useQueryFetch({
    endPoints: "feed/post",
    key: "feed",
    staleTime: Infinity,
  });

  const handleRefresh = async () => {
    client.invalidateQueries({
      queryKey: ["feed"],
      refetchType: "all",
      exact: true,
    });
  };

  if (isPending) return <p>Loading....</p>;
  return (
    <main className=" mt-10 p-4 pb-20">
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
    </main>
  );
};

export default FeedComp;
