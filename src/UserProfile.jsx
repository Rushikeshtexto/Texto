import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UserProfile.css";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import Home from "./Home";
import List from "./list";
const UserProfile = () => {
  const { id } = useParams(); // get id from URL
  const [user, setUser] = useState(null);
    const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profiles");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        const found = data.find(u => String(u.id) === String(id));
        setUser(found);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading user profile...</p>;

  

  return (
<div className="app">

  <div className="app">
      <Header />

      <div className="container">
     
        {/* ✅ Use Sidebar instead of hardcoding */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <section className="tab-content">
          {activeTab === "home" && <Home />}
          {activeTab === "profiles" && (
            <div className="tablecontainer">
  <h2 className="profile-title">
    {user.name.charAt(0).toUpperCase() + user.name.slice(1)} Profile
  </h2>

  <div className="profile-info">
    <p>
      <i className="fa-solid fa-envelope"></i>
      <span className="label">Email:</span>
      <span className="value">{user.email}</span>
    </p>

    <p>
      <i className="fa-solid fa-phone"></i>
      <span className="label">Phone:</span>
      <span className="value">{user.phone}</span>
    </p>

    <p>
      <i className="fa-solid fa-location-dot"></i>
      <span className="label">Location:</span>
      <span className="value">{user.location}</span>
    </p>

    <p>
      <i className="fa-solid fa-calendar-check"></i>
      <span className="label">First Active:</span>
      <span className="value">{user.first_active}</span>
    </p>

    <p>
      <i className="fa-solid fa-clock"></i>
      <span className="label">Last Updated:</span>
      <span className="value">{user.last_updated}</span>
    </p>
  </div>

  <button className="back-btn" onClick={() => navigate("/")}>
    ⬅ Back to Profiles
  </button>
</div>

          )}
          {activeTab === "segments" && <List />}
        </section>
      </div>
      

      <Footer />
    </div>
    
      
    </div>
  );
};

export default UserProfile;


