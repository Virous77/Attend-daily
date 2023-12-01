import {
  Modal,
  ModalContent,
  ModalBody,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import { useRouter, useParams, usePathname } from "next/navigation";
import Share from "@/common/share";

const ModalComp = () => {
  const {
    modal,
    state: { user },
  } = useAppContext();
  const { isOpen: openIt, onOpenChange: openChangeIt } = modal;
  const router = useRouter();
  const { name }: { name: string } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathName = usePathname();

  return (
    <div>
      <Modal
        isOpen={openIt}
        placement={"auto"}
        onOpenChange={openChangeIt}
        backdrop="opaque"
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
                <span
                  className=" p-3 text-center cursor-pointer font-bold"
                  onClick={() => {
                    openChangeIt();
                    onOpen();
                  }}
                >
                  Share
                </span>
                {user?.userName === name && (
                  <>
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
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Share
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        url={pathName}
        name="Profile"
      />
    </div>
  );
};

export default ModalComp;
