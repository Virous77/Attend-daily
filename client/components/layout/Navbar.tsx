"use client";

import React, { use } from "react";
import styles from "./navbar.module.scss";
import { ModeToggle } from "../ui/toggle-theme";
import MainForm from "../auth/form";
import Logout from "../auth/logout";
import FeedType from "./feedType";
import Logo from "./logo";
import { useAppContext } from "@/store/useAppContext";

export type NavbarProps = {
  isLoggedIn: string | undefined;
};

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const { state } = useAppContext();
  return (
    <nav className={`${styles.nav} bg-background`}>
      <FeedType />
      <Logo />

      <div className={styles.action}>
        {!isLoggedIn && !state.isLogged ? (
          <MainForm isLoggedIn={isLoggedIn} />
        ) : null}
        {isLoggedIn || state.isLogged ? <Logout /> : null}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
