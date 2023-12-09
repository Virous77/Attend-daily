import { useAppContext } from "@/store/useAppContext";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import LoaderComp from "../loader/Loader";

type AlertType = {
  title: string;
  description: string;
  buttonName: string;
  onAction: () => void;
  isLoading?: boolean;
};

const Alert: React.FC<AlertType> = ({
  title,
  description,
  buttonName,
  onAction,
  isLoading,
}) => {
  const { activeType, setActiveType } = useAppContext();

  return (
    <Modal
      isOpen={activeType === "alert-delete" ? true : false}
      onOpenChange={() => setActiveType("")}
      placement="center"
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className=" flex items-center justify-center flex-col">
              <p className=" text-[20px] mb-2">{title}</p>
              <span className=" text-[15px] leading-[1.25] text-center">
                {description}
              </span>
            </ModalHeader>
            <ModalFooter className="flex items-center justify-end flex-row gap-5">
              <Button
                variant="ghost"
                color="primary"
                onClick={onClose}
                disabled={isLoading}
                className=" rounded"
              >
                Cancel
              </Button>
              <Button
                className=" pl-8 pr-8 rounded"
                variant="shadow"
                color="danger"
                onClick={onAction}
                disabled={isLoading}
              >
                {isLoading ? <LoaderComp /> : buttonName}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Alert;
