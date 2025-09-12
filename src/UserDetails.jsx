// src/UserDetails.jsx
import React from "react";
import styles from "./UserDetails.module.css";




const UserDetails = ({ user, onBack, formatDate }) => {
  if (!user) return null;

 const maskEmail = (email) => {
    if (!email) return "";
    const [, domain] = email.split("@");
    return "*****@" + domain;
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    if (phone.length <= 3) return phone;
    return "*".repeat(phone.length - 3) + phone.slice(-3);
  };



  return (
    <div className={styles.tablecontainer}>
      {/* Back button at the top */}
      <button className={styles.backbtn} onClick={onBack}>
        ← Back
      </button>

      <h2 className={styles.profiletitle}>
        {user.name.charAt(0).toUpperCase() + user.name.slice(1)} Profile
      </h2>

      <div className={styles.profileinfo}>
        <p>
          <i className="fa-solid fa-envelope"></i>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{maskEmail(user.email)}</span>
        </p>

        <p>
          <i className="fa-solid fa-phone"></i>
          <span className={styles.label}>Phone:</span>
          <span className={styles.value}>{maskPhone(user.phone)}</span>
        </p>

        <p>
          <i className="fa-solid fa-location-dot"></i>
          <span className={styles.label}>Location:</span>
          <span className={styles.value}>{user.location}</span>
        </p>

        <p>
          <i className="fa-solid fa-calendar-check"></i>
          <span className={styles.label}>First Active:</span>
          <span className={styles.value}>{formatDate(user.first_active)}</span>
        </p>

        <p>
          <i className="fa-solid fa-clock"></i>
          <span className={styles.label}>Last Updated:</span>
          <span className={styles.value}>{formatDate(user.last_updated)}</span>
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
