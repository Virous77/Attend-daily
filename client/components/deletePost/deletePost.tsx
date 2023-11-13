import Alert from "../ui/custom/alert";
import { useAppContext } from "@/store/useAppContext";
import useQueryDelete from "@/hooks/useQueryDelete";
import { useQueryClient } from "@tanstack/react-query";

const DeletePost = () => {
  const {
    state: { open },
    setActiveType,
  } = useAppContext();
  const client = useQueryClient();

  const { mutateAsync, isPending } = useQueryDelete();

  const handleDelete = async () => {
    const data = await mutateAsync({ endPoint: `post/${open}` });
    if (data.status) {
      setActiveType("");
      client.invalidateQueries({
        queryKey: ["feed"],
        refetchType: "all",
        exact: true,
      });
    }
  };
  return (
    <Alert
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your post and related data."
      buttonName="Delete"
      onAction={handleDelete}
      isLoading={isPending}
    />
  );
};

export default DeletePost;
