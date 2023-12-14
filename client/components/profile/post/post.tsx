import React from "react";
import PostList from "./postList";
import PullToRefresh from "react-simple-pull-to-refresh";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import EmptyFeed from "../empty-feed";
import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  FeedSkeleton,
  ThreeDotsSkeleton,
} from "@/components/skeleton/skeleton";
import { CompletePost } from "@/types/types";
import PostCommon from "@/common/post";
import { invalidateServerQuery } from "@/api/action";

type TPost = {
  id: string;
  pinPost: CompletePost | null;
};

const Post: React.FC<TPost> = ({ id, pinPost }) => {
  const { invalidateKey } = useQueryInvalidate();
  const {
    postData,
    fetchNextPage,
    infiniteQuery,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQueryCustom<CompletePost>({
    endPoints: `post/all/${id}?pageSize=10`,
    staleTime: Number(process.env.NEXT_PUBLIC_QUERY_STALE_TIME),
    key: `${id}-post`,
    enabled: id ? true : false,
    type: "userAllPost",
  });

  const handleRefresh = async () => {
    invalidateKey([`${id}-post`]);
    invalidateServerQuery("userPin");
  };

  return (
    <section>
      {isLoading ? (
        <FeedSkeleton />
      ) : (
        <>
          {(postData && postData?.length > 0 && !isLoading) || pinPost ? (
            <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
              <InfiniteScroll
                dataLength={postData ? postData.length + 1 : 1}
                next={() => infiniteQuery.userAllPost && fetchNextPage()}
                hasMore={infiniteQuery.userAllPost}
                loader={null}
              >
                <ul className="flex flex-col gap-4 mt-3">
                  {pinPost && <PostCommon post={pinPost} type="profile" />}
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

export default Post;
