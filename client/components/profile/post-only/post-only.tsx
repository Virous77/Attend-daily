import { PostQueryResponse } from "@/components/feed/feed";
import useQueryFetch from "@/hooks/useQueryFetch";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { Loader } from "lucide-react";
import PullToRefresh from "react-simple-pull-to-refresh";
import PostList from "../post/postList";
import EmptyFeed from "../empty-feed";

const PostOnly = ({ id }: { id: string }) => {
  const { invalidateKey } = useQueryInvalidate();
  const { fetchResult, isPending }: PostQueryResponse = useQueryFetch({
    endPoints: `post/type/${id}/post`,
    key: `${id}-postOnly`,
    enabled: id ? true : false,
  });

  const handleRefresh = async () => {
    invalidateKey([`${id}-postOnly`]);
  };

  if (isPending) return <p>Loading..</p>;
  return (
    <section>
      {fetchResult.data && fetchResult?.data?.length > 0 ? (
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
      ) : (
        <EmptyFeed />
      )}
    </section>
  );
};

export default PostOnly;
