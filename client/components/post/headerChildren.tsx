"use client";

import { MdIosShare } from "react-icons/md";
import { toast } from "../ui/use-toast";

const HeaderChildren = () => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Successfully copy to clipboard",
      duration: 3000,
    });
  };

  return <MdIosShare size={20} cursor="pointer" onClick={handleCopy} />;
};

export default HeaderChildren;
