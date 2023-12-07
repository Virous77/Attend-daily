import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import PullToRefresh from "react-simple-pull-to-refresh";
import PostList from "../post/postList";
import EmptyFeed from "../empty-feed";
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  FeedSkeleton,
  ThreeDotsSkeleton,
} from "@/components/skeleton/skeleton";

const PostOnly = ({ id }: { id: string }) => {
  const { invalidateKey } = useQueryInvalidate();

  const {
    postData,
    fetchNextPage,
    infiniteQuery,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQueryCustom({
    endPoints: `post/type/${id}/post?pageSize=10`,
    key: `${id}-postOnly`,
    enabled: id ? true : false,
    type: "userPost",
    staleTime: Number(process.env.NEXT_PUBLIC_QUERY_STALE_TIME),
  });

  const handleRefresh = async () => {
    invalidateKey([`${id}-postOnly`]);
  };

  return (
    <section>
      {isLoading ? (
        <FeedSkeleton />
      ) : (
        <>
          {postData && postData?.length > 0 ? (
            <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
              <InfiniteScroll
                dataLength={postData ? postData.length + 1 : 1}
                next={() => infiniteQuery.userPost && fetchNextPage()}
                hasMore={infiniteQuery.userPost}
                loader={<p>Loading...</p>}
              >
                <ul className="flex flex-col gap-4 mt-3">
                  {postData &&
                    postData.map((post) => (
                      <PostList post={post} key={post._id} />
                    ))}
                  {isFetchingNextPage && (
                    <div className=" flex items-center justify-center mb-2">
                      <ThreeDotsSkeleton />
                    </div>
                  )}
                </ul>
              </InfiniteScroll>
            </PullToRefresh>
          ) : (
            <EmptyFeed />
          )}
        </>
      )}
    </section>
  );
};

export default PostOnly;
