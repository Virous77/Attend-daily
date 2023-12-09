import { Loader } from "lucide-react";
import React from "react";

const LoaderComp = () => {
  return (
    <div>
      <Loader className="animate-spin" size={20} />
    </div>
  );
};

export default LoaderComp;
