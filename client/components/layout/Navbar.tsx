"use client";

import React from "react";
import styles from "./navbar.module.scss";
import { ModeToggle } from "../ui/toggle-theme";
import MainForm from "../auth/form";
import Logout from "../auth/logout";
import FeedType from "./feedType";
import Logo from "./logo";
import { useAppContext } from "@/store/useAppContext";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useRouter } from "next/navigation";

export type NavbarProps = {
  isLoggedIn: string | undefined;
};

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const { state } = useAppContext();
  const router = useRouter();

  return (
    <nav className={`${styles.nav} bg-background`}>
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
          <MdOutlineNotificationsNone size={20} />
        </button>
      ) : null}
    </nav>
  );
};

export default Navbar;
