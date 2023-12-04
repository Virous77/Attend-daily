import { putData } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "@/store/useAppContext";

type MutateType = {
  postId: string;
  endPoints: string;
  type?: string;
};

const useProfileAction = () => {
  const {
    state: { user },
  } = useAppContext();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: MutateType) => {
      const res = await putData({
        endPoints: data.endPoints,
        params: { postId: data.postId, type: data.type },
        token: user?.token,
      });
      return res;
    },
  });
  return { mutateAsync };
};

export default useProfileAction;
