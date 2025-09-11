import React from "react";
import "./sidebar.css"; // ✅ using normal CSS, not modules

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <a
        className={`tablink ${activeTab === "home" ? "active" : ""}`}
        onClick={() => setActiveTab("home")}
      >
        Home
      </a>

      <a
        className={`tablink ${activeTab === "profiles" ? "active" : ""}`}
        onClick={() => setActiveTab("profiles")}
      >
        Profiles
      </a>

      <a
        className={`tablink ${activeTab === "segments" ? "active" : ""}`}
        onClick={() => setActiveTab("segments")}
      >
        List & Segments
      </a>
    </div>
  );
};

export default Sidebar;
