"use client";

import PullToRefresh from "react-simple-pull-to-refresh";
import PostList from "../profile/post/postList";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { useAppContext } from "@/store/useAppContext";
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom";
import InfiniteScroll from "react-infinite-scroll-component";

const FeedComp = () => {
  const { state } = useAppContext();
  const { postData, fetchMore, fetchNextPage } = useInfiniteQueryCustom({
    endPoints: `feed/post?type=${state.feedType}&pageSize=10`,
    staleTime: Infinity,
    key: `feed${state.feedType}`,
  });

  const { invalidateKey } = useQueryInvalidate();

  const handleRefresh = async () => {
    invalidateKey([`feed${state.feedType}`]);
  };

  return (
    <main className="p-4 pb-20 pt-0">
      <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
        <InfiniteScroll
          dataLength={postData ? postData.length + 1 : 1}
          next={() => fetchMore && fetchNextPage()}
          hasMore={fetchMore}
          loader={<p>Loading...</p>}
        >
          <ul className="flex flex-col gap-4 mt-1">
            {postData &&
              postData.map((post) => <PostList post={post} key={post._id} />)}
          </ul>
        </InfiniteScroll>
      </PullToRefresh>
    </main>
  );
};

export default FeedComp;
