import { X } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const useToast = () => {
  const notify = (message: string) => {
    toast.custom((t) => (
      <div
        className={`max-w-md w-fit bg-background shadow-lg pointer-events-auto flex  items-center gap-3 ring-1 ring-black ring-opacity-5 p-3 transition ease-in-out duration-300`}
        style={{ borderRadius: "15px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p>{message}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
          className="flex items-center justify-center rounded-full bg-primary cursor-pointer"
          style={{ width: "22px", height: "22px" }}
        >
          <X color="white" size={18} />
        </button>
      </div>
    ));
  };

  return { notify };
};

export default useToast;
