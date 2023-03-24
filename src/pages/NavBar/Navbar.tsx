import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import { AppErrorMessage } from "../../services";

const Navbar: React.FC = () => {
  useEffect(() => {
    AppErrorMessage(
      "Navigation bar is deprecated by the order of beton. Please do not use Navigation Bar. If you need to use it, probably you do not need to use it and you dont know yet."
    );
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <a href="/profile" className={styles.homeLink}>
          Home
        </a>
      </div>
      <div className={styles.right}>
        <div className={styles.profileDropdown}>
          <button className={styles.dropdownButton}>My Profile</button>
          <div className={styles.dropdownContent}>
            <a href="/profile">Profile</a>
            <a href="/settings">Settings</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
