import React from "react";
import styles from "./navbar.module.scss";
import { ModeToggle } from "../ui/toggle-theme";
import MainForm from "../auth/form";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div>Hello</div>

      <div className={styles.action}>
        <MainForm />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
