import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/api";
import { useAppContext } from "@/store/useAppContext";
import { toast } from "@/components/ui/use-toast";
import { AppError } from "@/types/types";

type QueryProps = {
  key: string;
  endPoints: string;
  staleTime?: number;
  enabled?: boolean;
};

const useQueryFetch = ({
  key,
  endPoints,
  staleTime = 0,
  enabled = true,
}: QueryProps) => {
  const { state } = useAppContext();

  const {
    data: fetchResult,
    isError,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      try {
        const data = await getData({ endPoints, token: state.user?.token });

        return data;
      } catch (error: any) {
        const err: AppError = error;
        toast({
          title: err.message || "Something went wrong while fetching data",
          duration: 40000,
          variant: "destructive",
        });
        return null;
      }
    },
    enabled: state.user?.token && enabled ? true : false,
    staleTime,
  });

  return { fetchResult, isError, error, isPending, refetch };
};

export default useQueryFetch;
