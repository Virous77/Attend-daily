import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { usePost } from "@/store/usePostContext";

type ActionProps = {
  name: string | ReactNode;
  onClick: () => void;
  onClose: () => void;
  active: boolean;
  disabled?: boolean;
};

const Action: React.FC<ActionProps> = ({
  name,
  onClick,
  onClose,
  active,
  disabled,
}) => {
  const { reset } = usePost();
  return (
    <div className="absolute bottom-0 w-full left-0 z-10 bg-accent flex flex-col gap-2 pb-4 p-5">
      <Button
        onClick={onClick}
        variant={active ? "default" : "disabled"}
        className={`w-full `}
        disabled={disabled}
      >
        {name}
      </Button>
      <Button
        onClick={() => {
          onClose();
          reset();
        }}
        variant="link"
        className=" w-full"
      >
        Cancel
      </Button>
    </div>
  );
};

export default Action;
