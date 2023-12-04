import { useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/store/useAppContext";

const useQueryInvalidate = () => {
  const client = useQueryClient();
  const {
    state: { user },
  } = useAppContext();

  const invalidateKey = (key: string[]) => {
    key.forEach((k) => {
      client.invalidateQueries({
        queryKey: [k],
        exact: true,
        refetchType: "all",
      });
    });
  };

  return { invalidateKey, user };
};

export default useQueryInvalidate;
