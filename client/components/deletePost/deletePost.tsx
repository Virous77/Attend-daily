import Alert from "../ui/custom/alert";
import { useAppContext } from "@/store/useAppContext";
import useQueryDelete from "@/hooks/useQueryDelete";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import { useParams } from "next/navigation";

const DeletePost = () => {
  const {
    state: { open, user },
    setActiveType,
  } = useAppContext();
  const { mutateAsync, isPending } = useQueryDelete();
  const { invalidateKey } = useQueryInvalidate();
  const { id } = useParams();

  const formatOpen = open.split("-");

  const handleDelete = async () => {
    const endPoint =
      formatOpen[1] === "post"
        ? `${formatOpen[1]}/${formatOpen[0]}`
        : `${formatOpen[1]}/${formatOpen[0]}?type=${formatOpen[2]}`;
    const data = await mutateAsync({
      endPoint: endPoint,
    });
    if (data.status) {
      setActiveType("");
      invalidateKey([`${id}-post`, "feedhome feed", "feedposts", "feedpolls"]);
      if (formatOpen[1] === "post") {
        invalidateKey([`${user?._id}-post`]);
      }
      if (formatOpen[1] === "comment") {
        invalidateKey([`${id}-comment`, `${formatOpen[0]}-comment`]);
      }
    }
  };
  return (
    <Alert
      title="Are you absolutely sure?"
      description={`This action cannot be undone. This will permanently delete your ${formatOpen[1]} and related data.`}
      buttonName="Delete"
      onAction={handleDelete}
      isLoading={isPending}
    />
  );
};

export default DeletePost;
