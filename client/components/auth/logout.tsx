"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

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
        <LogOut size={22} />
      </button>
    </div>
  );
};

export default Logout;
