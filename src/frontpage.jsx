import React, { useState } from "react";
import "./frontpage.css";
import Home from "./Home";
import Profile from "./allprofile";
import List from "./list";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";  // ✅ Import Sidebar

const FrontendPage = () => {
  const [activeTab, setActiveTab] = useState("profiles"); // default selected tab

  return (
    <div className="app">
      <Header />

      <div className="container">
     
        {/* ✅ Use Sidebar instead of hardcoding */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <section className="tab-content">
          {activeTab === "home" && <Home />}
          {activeTab === "profiles" && <Profile />}
          {activeTab === "segments" && <List />}
        </section>
      </div>
      

      <Footer />
    </div>
  );
};

export default FrontendPage;
