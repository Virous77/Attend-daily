import { redirect } from "next/navigation";
import { get } from "./layout";
import backgroundImage from "../public/home.svg";
import { Image } from "@nextui-org/react";
import React from "react";
import MainForm from "@/components/auth/form";

const Root = async () => {
  const value = await get();
  if (value?.value) return redirect("/feed");

  return (
    <main className=" px-4 py-2 pb-[100px]">
      <div className=" mt-4 flex flex-col items-center gap-3">
        <div className=" text-center">
          <h1 className=" text-2xl">ChatX</h1>
          <h1 className=" mt-1">Where Innovation Meets Connection!</h1>
        </div>

        <Image alt="home" src={backgroundImage.src} height={250} width={250} />
      </div>

      <div className=" text-center mt-[25px]">
        <p className=" text-lg">
          ChatX is a free and open-source chat application that allows you to
          chat with your friends and family.
        </p>

        <p className=" text-lg mt-3">
          Your privacy matters to us. ChatX is designed with robust security
          measures, ensuring a safe and secure space for you to connect, share,
          and engage
        </p>

        <MainForm type={true} />
      </div>
    </main>
  );
};

export default Root;
