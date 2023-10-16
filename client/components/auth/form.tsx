"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUserAlt } from "react-icons/fa";
import styles from "./form.module.scss";
import { useState } from "react";
import Login from "./login";
import Register from "./register";
import { useAppContext } from "@/store/useAppContext";

const MainForm = () => {
  const [formData, setFormData] = useState({
    active: false,
  });
  const { state } = useAppContext();

  const componentType = state.authModal ? "SIGN UP" : "SIGN IN";

  return (
    <Dialog
      open={formData.active}
      onOpenChange={() =>
        setFormData({ ...formData, active: formData.active ? false : true })
      }
    >
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
