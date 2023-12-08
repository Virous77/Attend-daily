import { ChangeEvent, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { usePost } from "@/store/usePostContext";
import { Input } from "@nextui-org/react";

const Choice = ({ name, pollTime }: { name: string; pollTime: number }) => {
  const [choiceCount, setChoiceCount] = useState([1, 2]);
  const { choice, setChoice } = usePost();

  const choiceMap = name === "Poll" ? choiceCount : choice;
  const currentTime = new Date().getTime();

  const showAddChoice = currentTime > pollTime && name === "Update Poll";

  const handleChoice = () => {
    if (choiceCount.length < 6) {
      setChoiceCount((prev) => [...prev, 1]);
      setChoice((prev) => [...prev, ""]);
    }
  };

  const handleChoiceRemove = (idx: number) => {
    const removeChoiceCount = choiceCount.filter((_, index) => index !== idx);
    const removeChoice = choice.filter((_, index) => index !== idx);

    setChoiceCount(removeChoiceCount);
    setChoice(removeChoice);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setChoice((prev) => {
      const updatedChoices = [...prev];
      updatedChoices[index] = value;
      return updatedChoices;
    });
  };

  return (
    <>
      <div className=" pl-14 mt-4 flex flex-col gap-3">
        {choiceMap.map((_, idx) => (
          <div key={idx}>
            <div className="space-y-1">
              <div className=" flex items-center gap-3">
                <Input
                  id={String(idx)}
                  name={String(idx)}
                  value={choice[idx]}
                  onChange={(e) => handleChange(e, idx)}
                  disabled={showAddChoice}
                  label={`Choice ${idx + 1}`}
                  variant="bordered"
                />
                {!showAddChoice && (
                  <>
                    {idx > 1 && (
                      <span
                        onClick={() => handleChoiceRemove(idx)}
                        className=" cursor-pointer hover:opacity-80"
                      >
                        <FaCircleMinus size={23} />
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAddChoice && (
        <>
          {choiceCount.length < 6 && (
            <div
              onClick={handleChoice}
              className=" flex items-center gap-3 justify-center mt-3 cursor-pointer"
            >
              <FaRegPlusSquare size={23} /> Add Choice
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Choice;
