import React from "react";
import { LuLoader2 } from "react-icons/lu";

const Loader = () => {
  return (
    <div>
      <LuLoader2 className="animate-spin" size={20} />
    </div>
  );
};

export default Loader;
