import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/api";
import { useAppContext } from "@/store/useAppContext";
import { AppError } from "@/types/types";
import useToast from "./useToast";

type QueryProps = {
  key: string;
  endPoints: string;
  staleTime?: number;
  enabled?: boolean;
};

const useQueryFetch = ({
  key,
  endPoints,
  staleTime = Number(process.env.NEXT_PUBLIC_QUERY_STALE_TIME),
  enabled,
}: QueryProps) => {
  const { state } = useAppContext();
  const { notify } = useToast();

  const {
    data: fetchResult,
    isError,
    error,
    isPending,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      try {
        const data = await getData({ endPoints, token: state.user?.token });

        return data;
      } catch (error: any) {
        const err: AppError = error;
        if (error.message === "Post not found") {
          return null;
        }
        notify(err.message || "Something went wrong while fetching data");

        return null;
      }
    },
    enabled: state.user?.token && enabled ? true : false,
    staleTime,
  });

  return { fetchResult, isError, error, isPending, refetch, isLoading };
};

export default useQueryFetch;
