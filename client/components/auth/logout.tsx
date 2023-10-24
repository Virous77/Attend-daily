"use client";

import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleDelete = async () => {
    const { data } = await axios.get("/api/logout");
    if (data.status === 200) {
      router.push("/");
      window.location.reload();
    }
  };

  return (
    <div>
      <button
        className=" border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2 rounded-lg cursor-pointer"
        onClick={handleDelete}
      >
        <BiLogOutCircle size={22} />
      </button>
    </div>
  );
};

export default Logout;