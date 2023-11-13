import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppContext } from "@/store/useAppContext";
import React from "react";
import { Button } from "../button";

type AlertType = {
  title: string;
  description: string;
  buttonName: string;
  onAction: () => void;
  isLoading?: boolean;
};

const Alert: React.FC<AlertType> = ({
  title,
  description,
  buttonName,
  onAction,
  isLoading,
}) => {
  const { activeType, setActiveType } = useAppContext();

  return (
    <AlertDialog
      open={activeType === "alert-delete" ? true : false}
      onOpenChange={() => setActiveType("")}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center justify-end flex-row gap-5">
          <Button
            variant="outline"
            onClick={() => setActiveType("")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className=" pl-8 pr-8"
            variant="destructive"
            onClick={onAction}
            disabled={isLoading}
          >
            {buttonName}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
