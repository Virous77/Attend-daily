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
    <div className="md:block hidden">
      <button className="btn-primary" onClick={handleDelete}>
        <BiLogOutCircle size={22} />
      </button>
    </div>
  );
};

export default Logout;
