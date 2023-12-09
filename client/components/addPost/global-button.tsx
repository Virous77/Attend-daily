"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import Layout from "./layout";
import Header from "@/common/header";
import { usePost } from "@/store/usePostContext";
import DeletePost from "../deletePost/deletePost";
import { BarChart3, FileText, Plus } from "lucide-react";

const GlobalPost = () => {
  const {
    state: { user },
    activeType,
    setActiveType,
  } = useAppContext();
  const { reset, status, modal } = usePost();
  const { isOpen, onOpen, onOpenChange } = modal;

  const headerName =
    activeType === "edit-poll"
      ? "EDIT POLL"
      : activeType === "edit-post"
      ? "EDIT POST"
      : activeType === "alert-delete"
      ? "DELETE POST"
      : activeType === "post"
      ? "CREATE POST"
      : activeType === "poll"
      ? "CREATE POLL"
      : activeType === "repost"
      ? "REPOST"
      : "";

  if (!user?.token) return null;
  return (
    <>
      {!isOpen && (
        <div className=" fixed right-6 z-[1000] bottom-24 w-[60px] h-[60px] rounded-full flex items-center justify-center  font-extrabold bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <Popover placement="top" className=" bg-transparent shadow-none">
            <PopoverTrigger className=" w-full  font-extrabold bg-gradient-to-br from-green-600 to-blue-600 text-white  h-full rounded-full flex items-center justify-center cursor-pointer transition hover:scale-[1.03]">
              <p>
                <Plus size={25} />
              </p>
            </PopoverTrigger>
            <PopoverContent className=" -bottom-2">
              <div className="px-1 py-2 flex flex-col gap-3">
                <div
                  className=" bg-accent p-3 rounded w-[120px] flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setActiveType("post");
                    onOpen();
                  }}
                >
                  <FileText size={25} />
                  <p className=" font-bold text-[16px]">Post</p>
                </div>
                <div
                  className=" bg-accent p-3 rounded w-[120px] flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setActiveType("poll");
                    onOpen();
                  }}
                >
                  <BarChart3 size={25} />
                  <p className=" font-bold text-[16px]">Poll</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {activeType === "alert-delete" && <DeletePost />}

      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        classNames={{
          wrapper: "z-[101]",
        }}
        className=" h-full"
      >
        <ModalContent className="max-w-full md:max-w-md h-full rounded-none m-0">
          {(onClose) => (
            <>
              <Header
                name={headerName}
                close={() => {
                  if (!status.isLoading) {
                    onClose();
                    reset();
                  }
                }}
              />
              <Layout type={activeType} onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GlobalPost;
