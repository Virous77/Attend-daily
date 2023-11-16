import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { BsInfoCircleFill, BsPinAngleFill } from "react-icons/bs";
import { Button } from "../ui/button";

const Info = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <span className=" cursor-pointer" onClick={onOpen}>
        <BsInfoCircleFill />
      </span>

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
              <ModalBody className="w-full pl-0 pr-0">
                <div className=" w-[95%] m-auto flex flex-col justify-center items-center text-center p-4">
                  <BsPinAngleFill size={23} />
                  <h2 className=" mt-2 text-[20px]">Pinning a Post</h2>
                  <p className=" mt-3 text-[15px]">
                    When you pin a post, it will stay at the top of the feed on
                    your Profile. This makes sure it&apos;s always seen when
                    people check you out.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className=" pt-2">
                <Button
                  onClick={onClose}
                  className=" w-full rounded-[30px] text-[17px] font-bold"
                  variant="outline"
                >
                  Got it!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Info;
