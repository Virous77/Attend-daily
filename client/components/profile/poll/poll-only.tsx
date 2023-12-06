import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import PullToRefresh from "react-simple-pull-to-refresh";
import PostList from "../post/postList";
import EmptyFeed from "../empty-feed";
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom";
import InfiniteScroll from "react-infinite-scroll-component";

const PollOnly = ({ id }: { id: string }) => {
  const { invalidateKey } = useQueryInvalidate();

  const { postData, infiniteQuery, fetchNextPage } = useInfiniteQueryCustom({
    endPoints: `post/type/${id}/poll?pageSize=10`,
    key: `${id}-pollOnly`,
    enabled: id ? true : false,
    staleTime: Number(process.env.NEXT_PUBLIC_QUERY_STALE_TIME),
    type: "userPoll",
  });

  const handleRefresh = async () => {
    invalidateKey([`${id}-pollOnly`]);
  };

  return (
    <section>
      {postData && postData?.length > 0 ? (
        <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
          <InfiniteScroll
            dataLength={postData ? postData.length + 1 : 1}
            next={() => infiniteQuery.userPoll && fetchNextPage()}
            hasMore={infiniteQuery.userPoll}
            loader={<p>Loading...</p>}
          >
            <ul className="flex flex-col gap-4 mt-3">
              {postData &&
                postData.map((post) => <PostList post={post} key={post._id} />)}
            </ul>
          </InfiniteScroll>
        </PullToRefresh>
      ) : (
        <EmptyFeed />
      )}
    </section>
  );
};

export default PollOnly;
