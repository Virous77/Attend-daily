import { getData } from "@/api/api";
import { useAppContext } from "@/store/useAppContext";
import { CompletePost } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

type QueryType = {
  endPoints: string;
  key: string;
  staleTime: number;
};

const useInfiniteQueryCustom = ({ endPoints, key, staleTime }: QueryType) => {
  const [fetchMore, setFetchMore] = useState(true);
  const { state } = useAppContext();

  const fetchIt = async ({ pageParam }: { pageParam: number }) => {
    const data = await getData({
      endPoints: `${endPoints}&pageNumber=${pageParam}`,
      token: state.user?.token,
    });

    if (data.data.length < 3) {
      setFetchMore(false);
    } else {
      setFetchMore(true);
    }
    return data;
  };

  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [key],
      queryFn: fetchIt,
      initialPageParam: 1,
      getNextPageParam: (_, pages) => pages.length + 1,
      enabled: state.user?.token ? true : false,
      staleTime,
    });

  const postData: CompletePost[] | undefined = data?.pages.flatMap(
    (data) => data.data
  );

  return { postData, isFetchingNextPage, fetchNextPage, isLoading, fetchMore };
};

export default useInfiniteQueryCustom;
