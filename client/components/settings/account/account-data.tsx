import Header from "@/common/header";
import { useAppContext } from "@/store/useAppContext";
import { Modal, ModalContent } from "@nextui-org/react";

type AccountDataType = {
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
};

const AccountData: React.FC<AccountDataType> = ({ open, setOpen }) => {
  const {
    state: { user },
  } = useAppContext();
  return (
    <Modal
      isOpen={open === "Account" ? true : false}
      onOpenChange={() => setOpen("")}
      hideCloseButton={true}
      classNames={{
        wrapper: "z-[101]",
      }}
      className=" h-full"
      isDismissable={false}
      placement="bottom-center"
    >
      <ModalContent className=" rounded-none m-0 max-w-full md:max-w-md h-full bg-background">
        {(onClose) => (
          <>
            <Header name="Account" close={onClose} />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AccountData;
