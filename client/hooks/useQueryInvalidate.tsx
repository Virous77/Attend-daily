import { useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/store/useAppContext";

const useQueryInvalidate = () => {
  const client = useQueryClient();
  const {
    state: { user },
  } = useAppContext();

  const invalidateKey = (key: string) => {
    client.invalidateQueries({
      queryKey: [key],
      exact: true,
      refetchType: "all",
    });
  };

  return { invalidateKey, user };
};

export default useQueryInvalidate;
