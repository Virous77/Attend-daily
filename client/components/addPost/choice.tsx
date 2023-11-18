import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";

const Choice = () => {
  const [choiceCount, setChoiceCount] = useState([1, 2]);
  const [choice, setChoice] = useState(["", ""]);

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
    <div>
      <div className=" pl-14 mt-3 flex flex-col gap-3">
        {choiceCount.map((_, idx) => (
          <div key={idx}>
            <div className="space-y-1">
              <Label htmlFor={String(idx)} className=" font-bold text-[15px]">
                Choice {idx + 1}
              </Label>
              <div className=" flex items-center gap-3">
                <Input
                  id={String(idx)}
                  className=" bg-accent"
                  name={String(idx)}
                  value={choice[idx]}
                  onChange={(e) => handleChange(e, idx)}
                />
                {idx > 1 && (
                  <span
                    onClick={() => handleChoiceRemove(idx)}
                    className=" cursor-pointer hover:opacity-80"
                  >
                    <FaCircleMinus size={23} />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {choiceCount.length < 6 && (
        <div
          onClick={handleChoice}
          className=" flex items-center gap-3 justify-center mt-3 cursor-pointer"
        >
          <FaRegPlusSquare size={23} /> Add Choice
        </div>
      )}
    </div>
  );
};

export default Choice;
