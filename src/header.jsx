import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    window.location.href = "./"; // redirect to signup/login
  };

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.app}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.logo}>Texto</div>
        <nav>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>

          {/* Profile dropdown wrapper */}
          <div className={styles.profileWrapper} ref={dropdownRef}>
            <div
              className={styles.profileCircle}
              onClick={() => setOpen(!open)}
            >
              U
            </div>

            {/* Dropdown */}
            {open && (
              <div className={styles.dropdown}>
                <button onClick={handleLogout}>Logout</button>
                
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
