import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Quote, Repeat2 } from "lucide-react";
import useQueryPost from "@/hooks/useQueryPost";
import { PostListProps } from "@/components/profile/post/postList";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import useQueryDelete from "@/hooks/useQueryDelete";
import { usePost } from "@/store/usePostContext";
import { useAppContext } from "@/store/useAppContext";

const RePost: React.FC<PostListProps> = ({ post }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutateAsync } = useQueryPost();
  const { mutateAsync: deleteMutateAsync } = useQueryDelete();
  const { invalidateKey, user } = useQueryInvalidate();
  const { setRePostData, modal } = usePost();
  const { setActiveType, activeType } = useAppContext();

  const handleRepost = async (postId: string) => {
    const data = await mutateAsync({ endPoint: "repost", data: { postId } });

    if (data.status) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      invalidateKey([
        `${user?._id}-post`,
        "feedhome feed",
        "feedposts",
        "feedpolls",
      ]);
      onOpenChange();
    }
  };

  const handleRemoveRepost = async (postId: string) => {
    const data = await deleteMutateAsync({ endPoint: `repost/${postId}` });

    if (data.status) {
      invalidateKey(["feed", `${user?._id}-post`]);
      onOpenChange();
    }
  };

  const totalRepost = post.isRetweeted
    ? post.originalPost?.retweetUser?.users?.length
    : post.retweetUser?.users?.length;

  return (
    <>
      {(post?.userId._id === user?._id ||
        post.originalPost?.retweetUser?.users?.includes(user?._id || "")) &&
      post.isRetweeted ? (
        <div className=" flex items-center gap-1">
          <span className=" cursor-pointer" onClick={onOpen}>
            <Repeat2 size={21} color="green" />
          </span>
          {totalRepost > 0 && <span>{totalRepost}</span>}
        </div>
      ) : (
        <div className=" flex items-center gap-1">
          <span className=" cursor-pointer" onClick={onOpen}>
            <Repeat2 size={21} />
          </span>
          {totalRepost > 0 && <span>{totalRepost}</span>}
        </div>
      )}
      <Modal
        isOpen={isOpen}
        placement={"auto"}
        onOpenChange={onOpenChange}
        backdrop="transparent"
        className="bg-background text-foreground !w-full"
        hideCloseButton={true}
        classNames={{
          backdrop: "z-[10000]",
          wrapper: "z-[100000]",
        }}
      >
        <ModalContent className="max-w-full md:max-w-md">
          {(onClose) => (
            <>
              <ModalBody
                className="w-[80%] p-5 m-auto"
                style={{ paddingTop: "25px" }}
              >
                <div className=" flex flex-col gap-4">
                  {post.isRetweeted && post.userId._id === user?._id ? (
                    <>
                      {post.originalPost?.retweetUser?.users?.includes(
                        user?._id || ""
                      ) && (
                        <div
                          className=" flex items-center gap-2 cursor-pointer w-fit text-red-500"
                          onClick={() => handleRemoveRepost(post._id)}
                        >
                          <Repeat2 size={21} />
                          <span>Undo Repost</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {!post.originalPost?.retweetUser?.users?.includes(
                        user?._id || ""
                      ) && (
                        <div
                          className=" flex items-center gap-2 cursor-pointer w-fit"
                          onClick={() => handleRepost(post._id)}
                        >
                          <Repeat2 size={21} />
                          <span>Repost</span>
                        </div>
                      )}
                    </>
                  )}

                  <div
                    className=" flex items-center gap-2 w-fit cursor-pointer"
                    onClick={() => {
                      setActiveType("repost");
                      setRePostData((prev) => ({ ...prev, post: post }));
                      onOpenChange();
                      modal.onOpen();
                    }}
                  >
                    <Quote size={21} />
                    <span>Quote Repost</span>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className=" pt-2">
                <Button
                  onClick={onClose}
                  className=" w-full rounded-[30px] text-[17px] font-bold"
                  variant="ghost"
                  color="primary"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RePost;
