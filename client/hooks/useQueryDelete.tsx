import { deleteData } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "@/store/useAppContext";
import useToast from "./useToast";

type MutateType = {
  endPoint: string;
};

const useQueryDelete = () => {
  const { notify } = useToast();

  const {
    state: { user },
  } = useAppContext();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (params: MutateType) => {
      try {
        const data = await deleteData({
          endPoints: params.endPoint,
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
          throw error.message;
        }
        throw error.message;
      }
    },

    onError: (data: string) => {
      notify(data?.toString());
    },
  });
  return { mutateAsync, isPending };
};

export default useQueryDelete;
