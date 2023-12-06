import { getData } from "@/api/api";
import { useAppContext } from "@/store/useAppContext";
import { CompletePost } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type QueryType = {
  endPoints: string;
  key: string;
  staleTime: number;
  enabled: boolean;
  type: string;
};

const useInfiniteQueryCustom = ({
  endPoints,
  key,
  staleTime,
  enabled,
  type,
}: QueryType) => {
  const { state, infiniteQuery, setInfiniteQuery } = useAppContext();

  const fetchIt = async ({ pageParam }: { pageParam: number }) => {
    const data = await getData({
      endPoints: `${endPoints}&pageNumber=${pageParam}`,
      token: state.user?.token,
    });

    const isDataLengthLessThan10 = data.data.length < 10;
    if (type === "feed") {
      setInfiniteQuery((prev) => ({ ...prev, feed: !isDataLengthLessThan10 }));
    } else if (type === "userAllPost") {
      setInfiniteQuery((prev) => ({
        ...prev,
        userAllPost: !isDataLengthLessThan10,
      }));
    } else if (type === "userPoll") {
      setInfiniteQuery((prev) => ({
        ...prev,
        userPoll: !isDataLengthLessThan10,
      }));
    } else if (type === "userPost") {
      setInfiniteQuery((prev) => ({
        ...prev,
        userPost: !isDataLengthLessThan10,
      }));
    }
    return data;
  };

  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [key],
      queryFn: fetchIt,
      initialPageParam: 1,
      getNextPageParam: (_, pages) => pages.length + 1,
      enabled: state.user?.token && enabled ? true : false,
      staleTime,
    });

  const postData: CompletePost[] | undefined = data?.pages.flatMap(
    (data) => data.data
  );

  return {
    postData,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    infiniteQuery,
  };
};

export default useInfiniteQueryCustom;
