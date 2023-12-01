import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  Card,
  CardBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { BsWhatsapp, BsTwitter, BsTelegram, BsLinkedin } from "react-icons/bs";
import { LuMail, LuCopy, LuCopyCheck } from "react-icons/lu";

type ShareProps = {
  onOpenChange: () => void;
  isOpen: boolean;
  url: string;
  name: string;
};

const Share: React.FC<ShareProps> = ({ isOpen, onOpenChange, url, name }) => {
  const base_url = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const [copy, setCopy] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${base_url}${url}`);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
  };
  return (
    <Modal
      isOpen={isOpen}
      placement={"auto"}
      onOpenChange={onOpenChange}
      backdrop="opaque"
      className="bg-background text-foreground !w-full"
      hideCloseButton={true}
      classNames={{
        backdrop: "z-[101]",
        wrapper: "z-[1000]",
      }}
    >
      <ModalContent className="max-w-full md:max-w-m z-[102]">
        {(onClose) => (
          <>
            <ModalHeader className="  justify-center">
              <p>Share {name}</p>
            </ModalHeader>
            <ModalBody className="w-full pl-0 pr-0">
              <div
                className="overflow-scroll w-full hideScroll"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: "10px",
                  padding: "4px",
                }}
              >
                <Card className=" w-[100px] h-[80px] cursor-pointer box-shadow-local">
                  <CardBody className=" flex items-center" onClick={handleCopy}>
                    {!copy ? <LuCopy size={30} /> : <LuCopyCheck size={30} />}
                  </CardBody>
                </Card>
                <Card className=" w-[100px] h-[80px] cursor-pointer  box-shadow-local">
                  <a
                    className="shareListItem"
                    href={`https://api.whatsapp.com/send?text=${base_url}${url}`}
                    data-action="share/whatsapp/share"
                    target={"_blank"}
                    referrerPolicy="no-referrer"
                  >
                    <CardBody className=" flex items-center">
                      <BsWhatsapp size={30} />
                    </CardBody>
                  </a>
                </Card>
                <Card className=" w-[100px] h-[80px] cursor-pointer box-shadow-local">
                  <a
                    href={`http://twitter.com/share?text=ChatX Post&url=${base_url}${url}&hashtags=#ChatX #share`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    <CardBody className=" flex items-center">
                      <BsTwitter size={30} />
                    </CardBody>
                  </a>
                </Card>
                <Card className=" w-[100px] h-[80px] cursor-pointer box-shadow-local">
                  <a
                    href={`mailto:?subject=ChatX Post&body=${base_url}${url}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    title="Share by Email"
                  >
                    <CardBody className=" flex items-center">
                      <LuMail size={30} />
                    </CardBody>
                  </a>
                </Card>
                <Card className=" w-[100px] h-[80px] cursor-pointer box-shadow-local">
                  <a
                    href={`https://telegram.me/share/url?url=${base_url}${url}&text=ChatX post`}
                    target={"_blank"}
                    referrerPolicy="no-referrer"
                  >
                    <CardBody className=" flex items-center">
                      <BsTelegram size={30} />
                    </CardBody>
                  </a>
                </Card>
                <Card className=" w-[100px] h-[80px] cursor-pointer box-shadow-local">
                  <a
                    href={`https://www.linkedin.com/feed/?shareActive=true&text=${base_url}${url}`}
                    target={"_blank"}
                    referrerPolicy="no-referrer"
                  >
                    <CardBody className=" flex items-center">
                      <BsLinkedin size={30} />
                    </CardBody>
                  </a>
                </Card>
              </div>
            </ModalBody>
            <ModalFooter className=" w-full">
              <Button
                variant="outline"
                onClick={onClose}
                className=" w-full rounded-[30px] text-[17px] font-bold"
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Share;
