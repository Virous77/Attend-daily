"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import SearchForm from "./search-form";
import { useAppContext } from "@/store/useAppContext";

// type SearchModelType = {
//   isOpen: boolean;
//   onOpenChange: () => void;
// };

const SearchModel = () => {
  const { activeType, setActiveType } = useAppContext();

  const onOpenChange = () => {
    setActiveType("");
  };
  return (
    <Modal
      isOpen={activeType === "search" ? true : false}
      onOpenChange={onOpenChange}
      size="full"
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
              <SearchForm />
            </ModalHeader>
            <ModalBody className=" w-full"></ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SearchModel;
