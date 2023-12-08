import React, { ReactNode } from "react";
import { usePost } from "@/store/usePostContext";
import { Button } from "@nextui-org/react";

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
    <div
      className="absolute bottom-0 w-full left-0 z-10 bg-background flex flex-col gap-2 pb-4 p-5"
      style={{ boxShadow: "var(--shadow)" }}
    >
      <Button
        onClick={onClick}
        color={active ? "default" : "primary"}
        className="w-full rounded"
        disabled={disabled}
        variant="shadow"
      >
        {name}
      </Button>
      <Button
        onClick={() => {
          onClose();
          reset();
        }}
        color="primary"
        variant="ghost"
        className=" w-full rounded"
        disabled={disabled}
      >
        Cancel
      </Button>
    </div>
  );
};

export default Action;
