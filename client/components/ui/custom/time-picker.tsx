import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import moment from "moment";
import React, { useRef, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { Button } from "../button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Time from "@/common/time";

type StateType = {
  hour: string;
  minutes: string;
  type: string;
  firstMinutes: string;
  firstHour: string;
};

const TimePicker = () => {
  const currentTime = moment().format("h:mm:A");
  const formatTime = currentTime.split(":");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [time, setTime] = useState<StateType>({
    hour: formatTime[0],
    minutes: formatTime[1],
    type: formatTime[2],
    firstMinutes: "",
    firstHour: "",
  });
  const { hour, minutes, type } = time;

  const minuteRef = time.firstMinutes ? time.firstMinutes : formatTime[1];
  const hourRef = time.firstHour ? time.firstHour : formatTime[0];

  const hoursCount = Array.from({ length: 12 }, (_, index) => {
    return index + 1 < 10 ? `0${index + 1}` : String(index + 1);
  }).filter((value) => value !== String(hourRef));
  const minutesCount = Array.from({ length: 60 }, (_, index) => {
    return index <= 9 ? `0${index}` : String(index);
  }).filter((value) => value !== String(minuteRef));

  const hourScrollRef = useRef() as any;
  const minutesScrollRef = useRef() as any;

  const handleItemClick = (name: string) => {
    let itemElement;

    if (name === "hour") {
      itemElement = hourScrollRef.current;
    }

    if (name === "minutes") {
      itemElement = minutesScrollRef.current;
    }

    if (itemElement) {
      itemElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <span
        className=" flex items-center gap-2 cursor-pointer pr-2"
        onClick={onOpen}
      >
        <IoMdTime size={22} /> {`${hour}:${minutes} ${type}`}
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
                <div className=" flex items-start gap-3">
                  <ScrollArea className="h-[130px] w-fit rounded-md border">
                    <Time
                      firstRef={hourRef}
                      data={hoursCount}
                      value={time.hour}
                      onChange={(e) => {
                        setTime((prev) => ({ ...prev, hour: e, firstHour: e }));
                        handleItemClick("hour");
                      }}
                      ref={hourScrollRef}
                    />
                  </ScrollArea>

                  <ScrollArea className="h-[130px] w-fit rounded-md border">
                    <Time
                      firstRef={minuteRef}
                      data={minutesCount}
                      value={time.minutes}
                      onChange={(e) => {
                        setTime((prev) => ({
                          ...prev,
                          minutes: e,
                          firstMinutes: e,
                        }));
                        handleItemClick("minutes");
                      }}
                      ref={minutesScrollRef}
                    />
                  </ScrollArea>

                  <ScrollArea className="h-fit w-fit rounded-md border">
                    {["AM", "PM"].map((tag, idx) => (
                      <>
                        <div
                          key={idx}
                          className={`text-sm cursor-pointer hover:bg-accent p-3 ${
                            tag === time.type ? " text-green-500 bg-white" : ""
                          }`}
                          onClick={() =>
                            setTime((prev) => ({ ...prev, type: tag }))
                          }
                        >
                          {tag}
                        </div>
                        <Separator />
                      </>
                    ))}
                  </ScrollArea>
                </div>
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
};

export default TimePicker;
