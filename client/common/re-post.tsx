import { Button } from "@/components/ui/button";
import {
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

const RePost: React.FC<PostListProps> = ({ post }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutateAsync } = useQueryPost();
  const { mutateAsync: deleteMutateAsync } = useQueryDelete();
  const { invalidateKey, user } = useQueryInvalidate();

  const handleRepost = async (postId: string) => {
    const data = await mutateAsync({ endPoint: "repost", data: { postId } });

    if (data.status) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      invalidateKey("feed");
      invalidateKey(`${user?._id}-post`);
      onOpenChange();
    }
  };

  const handleRemoveRepost = async (postId: string) => {
    const data = await deleteMutateAsync({ endPoint: `repost/${postId}` });

    if (data.status) {
      invalidateKey("feed");
      invalidateKey(`${user?._id}-post`);
      onOpenChange();
    }
  };

  const totalRepost = post.isRetweeted
    ? post.originalPost?.retweetUser?.users?.length
    : post.retweetUser?.users?.length;

  return (
    <>
      {post?.userId._id === user?._id && post.isRetweeted ? (
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
                    <div
                      className=" flex items-center gap-2 cursor-pointer w-fit text-red-500"
                      onClick={() => handleRemoveRepost(post._id)}
                    >
                      <Repeat2 size={21} />
                      <span>Undo Repost</span>
                    </div>
                  ) : (
                    <div
                      className=" flex items-center gap-2 cursor-pointer w-fit"
                      onClick={() => handleRepost(post._id)}
                    >
                      <Repeat2 size={21} />
                      <span>Repost</span>
                    </div>
                  )}

                  <div className=" flex items-center gap-2 w-fit cursor-pointer">
                    <Quote size={21} />
                    <span>Quote Repost</span>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className=" pt-2">
                <Button
                  onClick={onClose}
                  className=" w-full rounded-[30px] text-[17px] font-bold"
                  variant="outline"
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
