"use client";

import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

const Logout = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    const { data } = await axios.get("/api/logout");
    if (data.status === 200) {
      router.push("/");
    }
  };

  if (pathName === "/") return null;

  return (
    <div>
      <p
        className=" border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2 rounded-lg cursor-pointer"
        onClick={handleDelete}
      >
        <BiLogOutCircle size={22} />
      </p>
    </div>
  );
};

export default Logout;
