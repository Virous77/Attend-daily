import { putData } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/store/useAppContext";
import { useState } from "react";

type MutateType = {
  postId: string;
  endPoints: string;
};

const useProfileAction = () => {
  const {
    state: { user },
  } = useAppContext();
  const client = useQueryClient();
  const [query, setQuery] = useState("");

  const { mutate } = useMutation({
    mutationFn: async (data: MutateType) => {
      const res = await putData({
        endPoints: data.endPoints,
        params: { postId: data.postId },
        token: user?.token,
      });
      return res;
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [query],
        refetchType: "all",
        exact: true,
      });
    },
  });
  return { mutate, setQuery };
};

export default useProfileAction;
