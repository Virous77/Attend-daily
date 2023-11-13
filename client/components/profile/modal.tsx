import React from "react";
import { Modal, ModalContent, ModalBody, Divider } from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import { useRouter } from "next/navigation";

const ModalComp = () => {
  const { modal } = useAppContext();
  const { isOpen, onOpenChange } = modal;
  const router = useRouter();

  return (
    <Modal
      isOpen={isOpen}
      placement={"auto"}
      onOpenChange={onOpenChange}
      backdrop="opaque"
      className="bg-background text-foreground !w-full"
      hideCloseButton={true}
    >
      <ModalContent className="max-w-full md:max-w-md">
        {(onClose) => (
          <>
            <ModalBody className="w-full pl-0 pr-0">
              <span className=" p-3 text-center cursor-pointer font-bold">
                Share
              </span>
              <Divider />
              <span
                className="p-3 text-center cursor-pointer font-bold"
                onClick={() => {
                  router.push("/settings");
                  onClose();
                }}
              >
                Settings
              </span>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
