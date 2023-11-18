"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { usePost } from "@/store/usePostContext";

export function DatePickerComp() {
  const { time, setTime } = usePost();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <span
        onClick={onOpen}
        className=" flex items-center gap-2 pl-3 cursor-pointer"
      >
        <FaRegCalendarAlt size={20} />{" "}
        {moment(time.date).format("MMM DD, YYYY")}
      </span>

      <Modal
        isOpen={isOpen}
        placement={"auto"}
        onOpenChange={onOpenChange}
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
              <ModalBody className=" flex items-center justify-center">
                <Calendar
                  mode="single"
                  selected={time.date}
                  onSelect={(e) =>
                    setTime((prev) => ({ ...prev, date: e ? e : new Date() }))
                  }
                  initialFocus
                  className=" pb-0"
                />
              </ModalBody>

              <ModalFooter className=" pt-2">
                <Button
                  onClick={onClose}
                  className=" w-full rounded-[30px] text-[17px] font-bold"
                  variant="outline"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
