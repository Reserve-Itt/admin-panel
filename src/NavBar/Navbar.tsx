import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <a href="/" className={styles.homeLink}>Home</a>
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
