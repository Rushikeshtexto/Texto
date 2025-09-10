import React from "react";
import styles from "./sidebar.module.css"; // ✅ fixed typo

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.sidebar}>
      <a
        className={`${styles.tablink} ${activeTab === "home" ? styles.active : ""}`}
        onClick={() => setActiveTab("home")}
      >
        Home
      </a>

      <a
        className={`${styles.tablink} ${activeTab === "profiles" ? styles.active : ""}`}
        onClick={() => setActiveTab("profiles")}
      >
        Profiles
      </a>

      <a
        className={`${styles.tablink} ${activeTab === "segments" ? styles.active : ""}`}
        onClick={() => setActiveTab("segments")}
      >
        List & Segments
      </a>
    </div>
  );
};

export default Sidebar;
