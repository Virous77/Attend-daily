import React from "react";
import { BsThreeDots } from "react-icons/bs";

const Cover = () => {
  return (
    <div className="fixed z-[1] bg-gradient-to-br from-green-600 to-blue-600 w-full h-48">
      <span className="fixed right-5 top-7 cursor-pointer">
        <BsThreeDots size={20} />
      </span>
    </div>
  );
};

export default Cover;
