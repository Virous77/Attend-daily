import Alert from "../ui/custom/alert";
import { useAppContext } from "@/store/useAppContext";
import useQueryDelete from "@/hooks/useQueryDelete";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";

const DeletePost = () => {
  const {
    state: { open, user },
    setActiveType,
  } = useAppContext();
  const { mutateAsync, isPending } = useQueryDelete();
  const { invalidateKey } = useQueryInvalidate();

  const handleDelete = async () => {
    const data = await mutateAsync({ endPoint: `post/${open}` });
    if (data.status) {
      setActiveType("");
      invalidateKey("feed");
      invalidateKey(`${user?._id}-post`);
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
