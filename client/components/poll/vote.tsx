import { Poll } from "@/types/types";
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import React, { Dispatch, SetStateAction } from "react";

type VoteType = {
  onOpenChange: () => void;
  isOpen: boolean;
  poll: Poll | null;
  setActiveVote: Dispatch<SetStateAction<Poll | null>>;
};

const Vote: React.FC<VoteType> = ({
  isOpen,
  onOpenChange,
  poll,
  setActiveVote,
}) => {
  const [selected, setSelected] = React.useState("");

  console.log(selected);
  return (
    <Modal
      isOpen={isOpen}
      placement={"auto"}
      onOpenChange={() => {
        onOpenChange();
        setActiveVote(null);
      }}
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
              <h2>Cast You Vote</h2>
              <RadioGroup value={selected} onValueChange={setSelected}>
                {poll?.choice.map((value, idx) => (
                  <Radio value={String(idx)} key={idx} className=" capitalize">
                    {value}
                  </Radio>
                ))}
              </RadioGroup>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Vote;
