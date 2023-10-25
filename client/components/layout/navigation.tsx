"use client";

import { navLink } from "@/utils/utils";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { useAppContext } from "@/store/useAppContext";

type NavigationProps = {
  isLoggedIn: string | undefined;
};

const Navigation: React.FC<NavigationProps> = ({ isLoggedIn }) => {
  const router = useRouter();
  const { state } = useAppContext();
  const pathName = usePathname();

  return (
    <aside
      className={`block md:hidden fixed bottom-0 left-0 w-full shadow-current bg-background`}
      style={{
        boxShadow: "var(--shadow)",
        padding: "10px 20px",
        paddingBottom: "30px",
      }}
    >
      <ul className="flex justify-between">
        {navLink.map((value) => (
          <li
            key={value.id}
            onClick={() => {
              if (value.link === "/profile") {
                router.push(
                  !isLoggedIn && !state.isLogged
                    ? "/"
                    : `${value.link}/reetesh-kumar`
                );
              } else {
                router.push(
                  !isLoggedIn &&
                    (value.link === "/feed" || value.link === "/search")
                    ? value.link
                    : isLoggedIn || state.isLogged
                    ? value.link
                    : "/"
                );
              }
            }}
            className={`cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-accent ${
              pathName.includes(value.link) &&
              "font-extrabold bg-gradient-to-br from-green-600 to-blue-600 text-white"
            }`}
          >
            {<value.icon size={20} />}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Navigation;
