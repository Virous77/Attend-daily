"use client";

import React from "react";
import { ModeToggle } from "../ui/toggle-theme";
import MainForm from "../auth/form";
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
        <Navbar
          shouldHideOnScroll={true}
          classNames={{
            wrapper: "pr-0 pl-0",
          }}
        >
          <nav
            className={`bg-background flex w-full items-center justify-between px-5 py-[10px]`}
            style={{ boxShadow: "var(--shadow)" }}
          >
            <FeedType />
            <Logo />

            <div className="items-center gap-8 flex">
              {!isLoggedIn && !state.isLogged ? (
                <MainForm type={false} />
              ) : null}
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
