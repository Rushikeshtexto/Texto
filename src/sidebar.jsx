import React from "react";
import "./sidebar.css"; // separate CSS for sidebar

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <a
        className={`tab-link ${activeTab === "home" ? "active" : ""}`}
        onClick={() => setActiveTab("home")}
      >
        Home
      </a>

      <a
        className={`tab-link ${activeTab === "profiles" ? "active" : ""}`}
        onClick={() => setActiveTab("profiles")}
      >
        Profiles
      </a>

      <a
        className={`tab-link ${activeTab === "segments" ? "active" : ""}`}
        onClick={() => setActiveTab("segments")}
      >
        List & Segments
      </a>
    </div>
  );
};

export default Sidebar;
