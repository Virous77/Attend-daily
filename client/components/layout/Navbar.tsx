import React from "react";
import styles from "./navbar.module.scss";
import { ModeToggle } from "../ui/toggle-theme";
import MainForm from "../auth/form";
import Logout from "../auth/logout";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div>Hello</div>

      <div className={styles.action}>
        <MainForm />
        <Logout />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
