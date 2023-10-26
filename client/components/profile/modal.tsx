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
      className="bg-background text-foreground"
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <span className=" p-3 text-center cursor-pointer">Share</span>
              <Divider />
              <span
                className="p-3 text-center cursor-pointer"
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
