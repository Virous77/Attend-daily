"use client";

import { Card } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import { Tabs } from "@/utils/utils";
import useAuth from "@/hooks/useAuth";
import AccountData from "./account/account-data";
import { useState } from "react";

const TabList = () => {
  const { handleLogout } = useAuth("/api/logout");
  const [open, setOpen] = useState("");

  const handleOperation = (name: string) => {
    if (name === "Logout") {
      handleLogout();
    } else {
      setOpen(name);
    }
  };

  return (
    <section className=" mt-2">
      <ul className=" flex flex-col gap-2">
        {Tabs.map((tab) => (
          <Card
            key={tab.name}
            className={`rounded-[0] cursor-pointer ${
              tab.name === "Logout" ? "bg-red-500" : "default"
            } `}
          >
            <div
              className={`${
                tab.name === "Logout" ? "py-[17px]" : "py-[10px]"
              } px-[20px] flex items-center justify-between`}
              onClick={() => handleOperation(tab.name)}
            >
              <div className=" flex items-center gap-2">
                {<tab.icon />}
                <span className=" text-[17px]">{tab.name}</span>
              </div>
              {tab.name !== "Logout" && <ChevronRight />}
            </div>
          </Card>
        ))}
      </ul>
      <AccountData open={open} setOpen={setOpen} />
    </section>
  );
};

export default TabList;
