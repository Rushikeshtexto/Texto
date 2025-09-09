import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./UserProfile.css";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import Home from "./Home";
import List from "./list";
const UserProfile = () => {
  const { id } = useParams(); // get id from URL
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

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
      <Header />
        <div className="main-content">

          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
         <div className="">
          {activeTab === "home" && <Home />}
          
          {activeTab === "profile" && (
            <div className="tablecontainer">
              <h2>{user.name.charAt(0).toUpperCase() + user.name.slice(1)} Profile</h2>
              <br />
              <p>
                <i className="fa-solid fa-envelope"></i> <b>Email:</b> {user.email}
              </p>
              <p>
                <i className="fa-solid fa-phone"></i> <b>Phone:</b> {user.phone}
              </p>
              <p>
                <i className="fa-solid fa-location-dot"></i> <b>Location:</b> {user.location}
              </p>
              <p>
                <i className="fa-solid fa-calendar-check"></i> <b>First Active:</b> {user.first_active}
              </p>
              <p>
                <i className="fa-solid fa-clock"></i> <b>Last Updated:</b> {user.last_updated}
              </p>
              <br />
              <Link className="link" to="/">⬅ Back to Profiles</Link>
            </div>
          )}

          {activeTab === "segments" && <List />}
          </div>
        </div>
      

      <Footer />
    </div>
  );
};

export default UserProfile;


