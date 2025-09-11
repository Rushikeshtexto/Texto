import React, { useState } from "react";

import Home from "./Home";
import Profile from "./allprofile";
import List from "./list";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";  // ✅ Import Sidebar
import  "./frontpage.css";


const FrontendPage = () => {
  const [activeTab, setActiveTab] = useState("profiles"); // default selected tab

  return (
    <div className="app">
      <Header />

      <div className="container">
     
        {/* ✅ Use Sidebar instead of hardcoding */}
        <div  className="sidebarcontainer">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="tabcontent">
          {activeTab === "home" && <Home />}
          {activeTab === "profiles" && <Profile />}
          {activeTab === "segments" && <List />}
        </div>
      </div>
      

      <Footer />
    </div>
  );
};

export default FrontendPage;
