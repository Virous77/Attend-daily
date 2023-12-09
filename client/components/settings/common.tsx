import Header from "@/common/header";
import { Modal, ModalContent } from "@nextui-org/react";
import AccountData from "./account/account-data";

type CommonType = {
  open: string | undefined;
  setOpen: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Common: React.FC<CommonType> = ({ open, setOpen }) => {
  return (
    <Modal
      isOpen={open ? true : false}
      onOpenChange={() => setOpen(undefined)}
      hideCloseButton={true}
      classNames={{
        wrapper: "z-[1000]",
      }}
      className=" h-full"
      isDismissable={false}
      placement="bottom-center"
    >
      <ModalContent className=" rounded-none m-0 max-w-full md:max-w-md h-full bg-background">
        {(onClose) => (
          <>
            <Header name={open!} close={onClose} />
            {open === "Account" && <AccountData />}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Common;
