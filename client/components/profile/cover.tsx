"use client";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppContext } from "@/store/useAppContext";
import ModalComp from "./modal";

const Cover = () => {
  const { modal } = useAppContext();

  return (
    <div className="fixed z-[1] bg-gradient-to-br from-green-600 to-blue-600 w-full h-48">
      <span
        className="fixed right-5 top-7 cursor-pointer"
        onClick={() => modal.onOpen()}
      >
        <BsThreeDots size={20} />
      </span>
      <ModalComp />
    </div>
  );
};

export default Cover;
