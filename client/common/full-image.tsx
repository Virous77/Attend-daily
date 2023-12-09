import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import Header from "./header";
import { FolderDown } from "lucide-react";
import ReactPlayer from "react-player";
import useToast from "@/hooks/useToast";

type FullImageProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  url: string;
  type: "image" | "video";
};

const FullImage: React.FC<FullImageProps> = ({
  isOpen,
  onOpenChange,
  url,
  type,
}) => {
  const { notify } = useToast();

  async function downloadImage() {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = type === "image" ? "chatX-image.jpg" : "chatX-video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      notify("Error in downloading image");
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      hideCloseButton={true}
      classNames={{
        backdrop: "z-[1000]",
        wrapper: "z-[10000]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <Header name="" close={onOpenChange}>
                <FolderDown
                  size={22}
                  onClick={downloadImage}
                  cursor="pointer"
                />
              </Header>
            </ModalHeader>
            <ModalBody className=" w-full">
              {type === "image" ? (
                <div className=" mt-8  flex items-center justify-center w-full h-full">
                  <Image
                    src={url}
                    alt="profile image"
                    isBlurred={true}
                    loading="lazy"
                    className=" w-full h-full"
                  />
                </div>
              ) : (
                <div className="mt-8  flex items-center justify-center w-full h-full">
                  <ReactPlayer
                    url={url}
                    playing={true}
                    loop={true}
                    width={"100%"}
                    height={"100%"}
                    controls={true}
                  />
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FullImage;
