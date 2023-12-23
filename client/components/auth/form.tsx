"use client";

import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import { useAppContext } from "@/store/useAppContext";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { User } from "lucide-react";

const MainForm = ({ type }: { type: boolean }) => {
  const [open, setOpen] = useState(false);
  const { state, setState } = useAppContext();

  const componentType = state.authModal ? "SIGN UP" : "SIGN IN";
  const action = state.isLoading === "login" ? true : open;
  const actionTwo = type ? false : state.redirectLogin;

  return (
    <React.Fragment>
      {type ? (
        <Button
          onClick={() => setOpen(true)}
          className=" mt-4 rounded w-full"
          color="primary"
          variant="shadow"
        >
          Join ChatX
        </Button>
      ) : (
        <p
          className=" border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3 rounded-lg cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <User size={20} />
        </p>
      )}
      <Modal
        isOpen={state.isLogged ? false : action || actionTwo}
        onOpenChange={() => {
          setOpen(false);
          setState((prev) => ({ ...prev, redirectLogin: false }));
        }}
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
