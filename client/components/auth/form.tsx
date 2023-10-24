"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUserAlt } from "react-icons/fa";
import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import { useAppContext } from "@/store/useAppContext";
import { NavbarProps } from "../layout/Navbar";

const MainForm: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const { state } = useAppContext();

  const componentType = state.authModal ? "SIGN UP" : "SIGN IN";

  return (
    <Dialog open={isLoggedIn ? false : open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p className=" border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3 rounded-lg">
          <FaUserAlt />
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <p className="text-center">{componentType}</p>
        </DialogHeader>
        {!state.authModal && <Login />}
        {state.authModal && <Register />}
      </DialogContent>
    </Dialog>
  );
};

export default MainForm;
