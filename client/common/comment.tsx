import MainCommentList from "@/common/mainCommentList";
import { CommentReplies } from "@/types/types";
import { Image } from "@nextui-org/react";
import React from "react";
import noComment from "../public/comment.svg";
import {
  CommentSkeleton,
  ThreeDotsSkeleton,
} from "@/components/skeleton/skeleton";
import PullToRefresh from "react-simple-pull-to-refresh";
import { InfiniteQueryFalse } from "@/store/useAppContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppContext } from "@/store/useAppContext";

type CommentProps = {
  data: CommentReplies[] | undefined;
  type: string;
  isLoading: boolean;
  handleRefresh: () => Promise<any>;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  infiniteQuery: InfiniteQueryFalse;
};

const CommonComment: React.FC<CommentProps> = ({
  data,
  type,
  isLoading,
  handleRefresh,
  fetchNextPage,
  infiniteQuery,
  isFetchingNextPage,
}) => {
  const { tempComment } = useAppContext();
  return (
    <>
      {isLoading ? (
        <div className=" flex flex-col gap-2">
          {[1, 2].map((item) => (
            <CommentSkeleton key={item} />
          ))}
        </div>
      ) : (
        <>
          <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
            <InfiniteScroll
              dataLength={data ? data.length + 1 : 1}
              next={() => infiniteQuery.feed && fetchNextPage()}
              hasMore={infiniteQuery.feed}
              loader={null}
            >
              {tempComment && (
                <MainCommentList
                  key={tempComment._id}
                  type="p"
                  comment={tempComment}
                />
              )}
              {data && data?.length > 0 && !isLoading ? (
                <div className="pb-4">
                  {data?.map((comment) => (
                    <MainCommentList
                      key={comment._id}
                      comment={comment}
                      type={type}
                    />
                  ))}
                  {isFetchingNextPage && (
                    <div className=" flex items-center justify-center mt-3 ">
                      <ThreeDotsSkeleton />
                    </div>
                  )}
                </div>
              ) : (
                <div className=" flex items-center justify-center mt-8 flex-col">
                  <Image
                    src={noComment.src}
                    alt="no-comment"
                    width={100}
                    height={100}
                    placeholder="blur"
                  />
                  <p className=" text-[12px] mt-2">No Comment founds.</p>
                </div>
              )}
            </InfiniteScroll>
          </PullToRefresh>
        </>
      )}
    </>
  );
};

export default CommonComment;
