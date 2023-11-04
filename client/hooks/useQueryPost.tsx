import { postData } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/store/useAppContext";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

type MutateType = {
  endPoint: string;
  data: any;
};

const useQueryPost = () => {
  const {
    state: { user },
  } = useAppContext();
  const client = useQueryClient();
  const [key, setKey] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (params: MutateType) => {
      try {
        const data = await postData({
          endPoints: params.endPoint,
          params: params.data,
          token: user?.token,
        });

        if (data.status) {
          return data;
        } else {
          throw new Error(
            data.message || "Something went wrong,Try again later"
          );
        }
      } catch (error: any) {
        if (error.status > 201) {
          throw error.data.message;
        }
        throw error.message;
      }
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [key],
        exact: true,
        refetchType: "all",
      });
    },
    onError: (data: string) => {
      toast({ title: data, variant: "destructive", duration: 4000 });
    },
  });
  return { mutateAsync, isPending, setKey };
};

export default useQueryPost;
