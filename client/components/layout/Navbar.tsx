"use client";

import React from "react";
import { ModeToggle } from "../ui/toggle-theme";
import MainForm from "../auth/form";
import Logout from "../auth/logout";
import FeedType from "./feedType";
import Logo from "./logo";
import { useAppContext } from "@/store/useAppContext";
import { useRouter, usePathname } from "next/navigation";
import { Navbar } from "@nextui-org/react";
import { BellRing } from "lucide-react";

export type NavbarProps = {
  isLoggedIn: string | undefined;
};

const NavbarComp: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const { state, setState } = useAppContext();
  const router = useRouter();
  const pathName = usePathname();

  const handleScroll = (e: number) => {
    const hasScrolled = e >= 70;

    if (hasScrolled) {
      setState((prev) => ({
        ...prev,
        isScroll: prev.lastScrollNumber > e ? false : true,
        lastScrollNumber: e,
      }));
    }
  };

  return (
    <React.Fragment>
      {(pathName === "/" || pathName === "/feed") && (
        <Navbar shouldHideOnScroll={true}>
          <nav
            className={`bg-background flex fixed left-0 md:left-2/4 w-full md:w-[80%] md:transform -translate-x-1/2 -translate-y-1/2 transform-none items-center justify-between md:top-[7%] top-0 z-[100] px-5 py-[10px] md:rounded-[40px]`}
            style={{ boxShadow: "var(--shadow)" }}
          >
            <FeedType />
            <Logo />

            <div className="items-center gap-8 flex">
              {!isLoggedIn && !state.isLogged ? (
                <MainForm isLoggedIn={isLoggedIn} />
              ) : null}
              {isLoggedIn || state.isLogged ? <Logout /> : null}
              <div className="md:block hidden">
                <ModeToggle />
              </div>
            </div>
            {isLoggedIn || state.isLogged ? (
              <button
                className="btn-primary md:hidden block"
                onClick={() => router.push("/notification")}
              >
                <BellRing size={20} />
              </button>
            ) : null}
          </nav>
        </Navbar>
      )}
    </React.Fragment>
  );
};

export default NavbarComp;
