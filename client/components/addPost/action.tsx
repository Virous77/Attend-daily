import React from "react";
import { Button } from "../ui/button";

type ActionProps = {
  name: string;
  onClick: () => void;
  onClose: () => void;
  active: boolean;
};

const Action: React.FC<ActionProps> = ({ name, onClick, onClose, active }) => {
  return (
    <div className="absolute bottom-0 w-full left-0 z-10 bg-accent flex flex-col gap-2 pb-4 p-5">
      <Button
        onClick={onClick}
        variant={active ? "default" : "disabled"}
        className={`w-full `}
      >
        {name}
      </Button>
      <Button onClick={onClose} variant="link" className=" w-full">
        Cancel
      </Button>
    </div>
  );
};

export default Action;
