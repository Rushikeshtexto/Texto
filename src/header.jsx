import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
 
    navigate("/"); // Redirect to signup page
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">Texto</div>
        <nav>
          <button 
            onClick={handleLogout} 
            style={{
              background: "transparent",
              border: "none",
              color: "#333",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Logout
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;


