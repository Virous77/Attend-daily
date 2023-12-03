import { Poll } from "@/types/types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { BarChart4, Ticket } from "lucide-react";
import { useAppContext } from "@/store/useAppContext";
import { Separator } from "../ui/separator";
import Vote from "./vote";
import { useState } from "react";

type PollType = {
  poll: Poll;
  isActive?: boolean;
};

const PollComp: React.FC<PollType> = ({ poll, isActive = true }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeVote, setActiveVote] = useState<Poll | null>(null);

  const {
    state: { user },
  } = useAppContext();

  const totalVote = poll.vote
    .map((value) => value)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <Card className=" mt-2 m-1 shadow-none border">
      <CardHeader className=" flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <BarChart4 color="#16a34a" />
          Poll
        </div>
        <div className=" flex items-center gap-2">
          <Ticket />
          <div className=" flex items-center gap-1">
            <span>{totalVote}</span>
            {totalVote > 1 ? "Votes" : "Vote"}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <ul className=" flex flex-col gap-2">
          {poll.choice.map((value, idx) => (
            <li key={idx} className=" flex flex-col gap-[3px]">
              <p className=" text-[17px]">{value}</p>

              <div className=" flex items-center gap-3">
                {totalVote > 0 ? (
                  <span className=" text-[14px]">
                    {((poll.vote[idx] * 100) / totalVote).toFixed(0)}%
                  </span>
                ) : (
                  <span className=" text-[14px]">0%</span>
                )}

                <Progress
                  color="success"
                  aria-label="Loading..."
                  value={(poll.vote[idx] * 100) / totalVote}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardBody>

      {isActive && (
        <>
          {!poll.voters.includes(user?._id || "") && (
            <>
              {poll.expiryDate > new Date().getTime() ? (
                <CardFooter className=" justify-center flex-col gap-2">
                  <Separator className=" h-[2px]" />
                  <span
                    className=" opacity-80 cursor-pointer"
                    onClick={() => {
                      setActiveVote(poll);
                      onOpen();
                    }}
                  >
                    Cast Your Vote
                  </span>
                </CardFooter>
              ) : (
                <CardFooter className=" justify-center flex-col gap-2">
                  <Separator className=" h-[2px]" />
                  <span className=" opacity-80 cursor-pointer">
                    Voting Closed
                  </span>
                </CardFooter>
              )}
            </>
          )}
        </>
      )}

      <Vote
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        poll={activeVote}
        setActiveVote={setActiveVote}
      />
    </Card>
  );
};

export default PollComp;
