import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { MdReportGmailerrorred } from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" outline-none">
          <BsThreeDots size={20} cursor="pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-40 mr-2">
        <DropdownMenuGroup>
          <DropdownMenuItem className=" cursor-pointer">
            <User className="mr-2" size={20} />
            <span>Follow</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <MdReportGmailerrorred className="mr-2 " size={20} />
            <span>Edit Post</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className=" cursor-pointer">
            <TbCopy className="mr-2" size={20} />
            <span>Copy Link</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" cursor-pointer">
            <MdReportGmailerrorred className="mr-2" size={20} />
            <span>Report</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" bg-red-500 hover:bg-red-400 cursor-pointer">
            <MdReportGmailerrorred className="mr-2 " size={20} />
            <span>Delete Post</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
