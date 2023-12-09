"use client";

import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import { useAppContext } from "@/store/useAppContext";
import { NavbarProps } from "../layout/Navbar";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { User } from "lucide-react";

const MainForm: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const { state } = useAppContext();

  const componentType = state.authModal ? "SIGN UP" : "SIGN IN";

  return (
    <React.Fragment>
      <p
        className=" border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3 rounded-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <User size={20} />
      </p>
      <Modal
        isOpen={isLoggedIn ? false : state.isLoading === "login" ? true : open}
        onOpenChange={setOpen}
        placement="center"
        hideCloseButton
      >
        <ModalContent className=" bg-background">
          {(onClose) => (
            <ModalBody>
              <p className="text-center pt-2 text-[20px] font-bold">
                {componentType}
              </p>
              {!state.authModal && <Login />}
              {state.authModal && <Register />}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default MainForm;
