"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import { HiOutlinePlus } from "react-icons/hi";
import { BsFilePost } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";

const GlobalPost = () => {
  const {
    state: { user },
  } = useAppContext();

  if (!user?.token) return null;
  return (
    <div className=" fixed right-6 z-[1000] bottom-24 w-[60px] h-[60px] rounded-full flex items-center justify-center  font-extrabold bg-gradient-to-br from-green-600 to-blue-600 text-white">
      <Popover placement="top" className=" bg-transparent shadow-none">
        <PopoverTrigger className=" w-full  font-extrabold bg-gradient-to-br from-green-600 to-blue-600 text-white  h-full rounded-full flex items-center justify-center cursor-pointer transition hover:scale-[1.03]">
          <p>
            <HiOutlinePlus size={25} />
          </p>
        </PopoverTrigger>
        <PopoverContent className=" -bottom-2">
          <div className="px-1 py-2 flex flex-col gap-3">
            <div className=" bg-accent p-3 rounded w-[120px] flex items-center gap-2 cursor-pointer">
              <BsFilePost size={25} />
              <p className=" font-bold text-[16px]">Post</p>
            </div>
            <div className=" bg-accent p-3 rounded w-[120px] flex items-center gap-2 cursor-pointer">
              <BiPoll size={25} />
              <p className=" font-bold text-[16px]">Poll</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GlobalPost;
