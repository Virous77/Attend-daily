import { deleteData } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "@/store/useAppContext";
import { toast } from "@/components/ui/use-toast";

type MutateType = {
  endPoint: string;
};

const useQueryDelete = () => {
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
      toast({ title: data, variant: "destructive", duration: 4000 });
    },
  });
  return { mutateAsync, isPending };
};

export default useQueryDelete;
