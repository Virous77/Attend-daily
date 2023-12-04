import { Poll } from "@/types/types";
import {
  Modal,
  ModalBody,
  ModalContent,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import Loader from "../ui/loader/Loader";
import useQueryPut from "@/hooks/useQueryPut";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";

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
  const { mutateAsync, isPending } = useQueryPut();
  const { invalidateKey, user } = useQueryInvalidate();

  const reset = () => {
    onOpenChange();
    setActiveVote(null);
    setSelected("");
  };

  const handleAddVote = async () => {
    await mutateAsync({
      endPoint: "vote",
      data: { id: poll?._id, index: selected },
    });
    invalidateKey([
      `${user?._id}-post`,
      `${poll?.postId}-post`,
      "feedhome feed",
      "feedposts",
      "feedpolls",
    ]);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      placement={"auto"}
      onOpenChange={reset}
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
            <ModalBody className="w-full p-4">
              <h2 className=" text-center text-[17px] text-green-500">
                Cast Your Vote
              </h2>
              <RadioGroup value={selected} onValueChange={setSelected}>
                {poll?.choice.map((value, idx) => (
                  <Radio
                    value={String(idx)}
                    key={idx}
                    className=" capitalize"
                    color="success"
                  >
                    {value}
                  </Radio>
                ))}
              </RadioGroup>

              <div className=" w-full text-center mt-2 flex flex-col gap-3">
                <Button
                  className=" w-full"
                  disabled={isPending || !selected}
                  onClick={handleAddVote}
                  variant={!selected ? "disabled" : "default"}
                >
                  {isPending ? <Loader /> : "Add Vote"}
                </Button>
                <Button
                  onClick={reset}
                  variant={isPending ? "disabled" : "outline"}
                  className=" w-full rounded-[30px] text-[17px] font-bold"
                >
                  Close
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Vote;
