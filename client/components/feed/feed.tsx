"use client";

import PullToRefresh from "react-simple-pull-to-refresh";
import PostList from "../profile/post/postList";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { useAppContext } from "@/store/useAppContext";
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom";
import InfiniteScroll from "react-infinite-scroll-component";
import { FeedSkeleton, ThreeDotsSkeleton } from "../skeleton/skeleton";
import { CompletePost } from "@/types/types";

const FeedComp = () => {
  const { state, tempRePost } = useAppContext();
  const {
    postData,
    fetchNextPage,
    infiniteQuery,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQueryCustom<CompletePost>({
    endPoints: `feed/post?type=${state.feedType}&pageSize=10`,
    staleTime: Infinity,
    key: `feed${state.feedType}`,
    enabled: true,
    type: "feed",
  });

  const { invalidateKey } = useQueryInvalidate();

  const handleRefresh = async () => {
    invalidateKey([`feed${state.feedType}`]);
  };

  return (
    <main className="p-4 pb-20 pt-0">
      {isLoading ? (
        <>
          <FeedSkeleton />
          <FeedSkeleton />
        </>
      ) : (
        <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
          <InfiniteScroll
            dataLength={postData ? postData.length + 1 : 1}
            next={() => infiniteQuery.feed && fetchNextPage()}
            hasMore={infiniteQuery.feed}
            loader={null}
          >
            <ul className="flex flex-col gap-4 mt-1">
              {tempRePost && <PostList post={tempRePost} />}
              {postData &&
                postData.map((post) => <PostList post={post} key={post._id} />)}
              {isFetchingNextPage && (
                <div className=" flex items-center justify-center mb-2">
                  <ThreeDotsSkeleton />
                </div>
              )}
            </ul>
          </InfiniteScroll>
        </PullToRefresh>
      )}
    </main>
  );
};

export default FeedComp;
