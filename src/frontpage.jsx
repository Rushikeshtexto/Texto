import React, { useState } from "react";
import "./frontpage.css";

import Home from "./Home";
import Profile from "./allprofile";
import List from "./list";

const FrontendPage = () => {
  const [activeTab, setActiveTab] = useState();
  
  
  


  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">Texto</div>
      </header>

      <div className="signup-container">
        <div className="tab-buttons">
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

        <section className="tab-content">
          {activeTab === "home" && <Home/>}

          {activeTab === "profiles" && <Profile/>}

          {activeTab === "segments" && <List/>}
        </section>
      </div>

      <footer className="footer">
        <div className="footer-logo">Texto</div>
        <div className="footer-grid">
          <div>
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/press">Press & Media</a>
            <a href="/customer">Customers</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <h4>Docs</h4>
            <a href="/api">API</a>
            <a href="/help">Help Document</a>
            <a href="/forum">Forum</a>
          </div>
          <div>
            <h4>Follow us</h4>
            <a href="/linkdin">LinkedIn</a>
            <a href="/twitter">Twitter</a>
            <a href="/facebook">Facebook</a>
            <a href="/instagram">Instagram</a>
            <a href="/youtube">YouTube</a>
            <a href="/medium">Medium</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="legal">Privacy | Security | Cookies | Terms | DLT</p>
        </div>
      </footer>
    </div>
  );
};

export default FrontendPage;

