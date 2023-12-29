import { postData } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/store/useAppContext";
import { useState } from "react";
import useToast from "./useToast";

type MutateType = {
  endPoint: string;
  data: any;
};

const useQueryPost = () => {
  const {
    state: { user },
    setTempComment,
    setTempRePost,
  } = useAppContext();
  const client = useQueryClient();
  const [key, setKey] = useState("");
  const { notify } = useToast();

  const { mutateAsync, isPending, variables } = useMutation({
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
      setTimeout(() => {
        setTempComment(null);
        setTempRePost(null);
      }, 400);
      client.invalidateQueries({
        queryKey: [key],
        exact: true,
        refetchType: "all",
      });
    },
    onError: (data: string) => {
      notify(data?.toString());
    },
  });
  return { mutateAsync, isPending, setKey, variables };
};

export default useQueryPost;
