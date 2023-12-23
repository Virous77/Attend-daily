"use client";

import useInfiniteQueryCustom from "@/hooks/useInfiniteQueryCustom";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { Image, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import PullToRefresh from "react-simple-pull-to-refresh";
import { ThreeDotsSkeleton } from "../skeleton/skeleton";

type TData = { _id: string; image: string };
type TResponse = TData[];

const Explore = () => {
  const router = useRouter();
  const {
    postData,
    fetchNextPage,
    infiniteQuery,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQueryCustom<TResponse>({
    endPoints: `/explore?pageSize=10`,
    staleTime: Infinity,
    key: `explore`,
    enabled: true,
    type: "explore",
  });

  const { invalidateKey } = useQueryInvalidate();

  const handleRefresh = async () => {
    invalidateKey([`explore`]);
  };

  return (
    <div className="mt-[70px] px-4 py-2 pb-[70px]">
      {isLoading ? (
        <div className=" grid grid-cols-2 gap-2">
          {[1, 2, 3, 5].map((_, i) => (
            <Skeleton className="rounded-lg" key={i}>
              <div className="h-[250px] rounded-lg bg-default-300"></div>
            </Skeleton>
          ))}
        </div>
      ) : (
        <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
          <InfiniteScroll
            dataLength={postData ? postData.length + 1 : 1}
            next={() => infiniteQuery.explore && fetchNextPage()}
            hasMore={infiniteQuery.explore}
            loader={null}
          >
            <div className=" grid grid-cols-2 gap-2">
              {postData?.flat().map((post) => (
                <Image
                  src={post.image}
                  alt="ChatX Image"
                  key={post._id}
                  className=" w-full h-[250px] cursor-pointer"
                  isBlurred
                  onClick={() => router.push(`/post/${post._id}`)}
                />
              ))}
              {isFetchingNextPage && (
                <div className=" flex items-center justify-center mb-2">
                  <ThreeDotsSkeleton />
                </div>
              )}
            </div>
          </InfiniteScroll>
        </PullToRefresh>
      )}
    </div>
  );
};

export default Explore;
