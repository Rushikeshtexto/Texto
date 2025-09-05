import React, { useState, useEffect } from "react";
import "./frontpage.css";
import Pagination from "./pagination"; 
///////////////////////////////////////
const FrontendPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // ✅ pagination state
  const entriesPerPage = 10;

  // fetch data from backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "profiles") {
      fetchUsers();
    }
  }, [activeTab]);

  // ✅ format date to only show yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const safeValue = (val) => {
    if (!val) return "";
    if (typeof val === "object")
      return val.text || val.result || JSON.stringify(val);
    return String(val);
  };

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentEntries = filteredUsers.slice(indexOfFirst, indexOfLast);

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">Texto</div>
      </header>

      <div className="signup-container">
        <div className="tab-buttons">
          <a
            href="#"
            className={`tab-link ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </a>
          <a
            href="#"
            className={`tab-link ${activeTab === "profiles" ? "active" : ""}`}
            onClick={() => setActiveTab("profiles")}
          >
            All Profiles
          </a>
          <a
            href="#"
            className={`tab-link ${activeTab === "segments" ? "active" : ""}`}
            onClick={() => setActiveTab("segments")}
          >
            List & Segments
          </a>
        </div>

        <section className="tab-content">
          {activeTab === "home" && (
            <div>
              <h2>Welcome to Texto</h2>
              <p>This is your dashboard home page.</p>
            </div>
          )}

          {activeTab === "profiles" && (
            <div className="profiles-section">
              <h2>All Profiles</h2>
              <input
                type="text"
                placeholder="🔍 Search by name, email or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-box"
              />

              {currentEntries.length === 0 ? (
                <p className="no-entries">⚠️ No entries found.</p>
              ) : (
                <>
                  <div className="table-container">
                    <table className="profiles-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Location</th>
                          <th>First Active</th>
                          <th>Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEntries.map((u, index) => (
                          <tr
                            key={u.id}
                            className={index % 2 === 0 ? "even-row" : "odd-row"}
                          >
                            <td>{u.name}</td>
                            <td>{safeValue(u.email)}</td>
                            <td>{u.phone}</td>
                            <td>{u.location}</td>
                            <td>{formatDate(u.first_active)}</td>
                            <td>{formatDate(u.last_updated)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* ✅ Pagination Component */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          )}

          {activeTab === "segments" && (
            <div className="segments-section">
              <h2>List & Segments</h2>
              <input
                type="text"
                placeholder="🔍 Search segments..."
                className="segments-search"
              />
              <div className="segments-buttons">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append("file", file);
                    try {
                      const res = await fetch("http://localhost:5000/upload", {
                        method: "POST",
                        body: formData,
                      });
                      const data = await res.json();
                      alert(data.message || "✅ File uploaded successfully!");
                    } catch (err) {
                      console.error("❌ Error uploading file:", err);
                      alert("Failed to upload file.");
                    }
                  }}
                />
                <button
                  className="btn add-segment"
                  onClick={() => document.getElementById("fileUpload").click()}
                >
                  Add List
                </button>
                <button className="btn add-segment"> Add Segment</button>
              </div>
            </div>
          )}
        </section>
      </div>

      <footer className="footer">
        <div className="footer-logo">Texto</div>
        <div className="footer-grid">
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Press & Media</a>
            <a href="#">Customers</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Docs</h4>
            <a href="#">API</a>
            <a href="#">Help Document</a>
            <a href="#">Forum</a>
          </div>
          <div>
            <h4>Follow us</h4>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
            <a href="#">Medium</a>
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

/*

import React, { useState, useEffect } from "react";
import "./frontpage.css";
import Pagination from "./pagination"

const FrontendPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[currentPage,setcurrentPage]=useState(1);
  const entriesPerPage=10;

  // fetch data from backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "profiles") {
      fetchUsers();
    }
  }, [activeTab]);

  // ✅ format date to only show yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())||
      u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
     
  );

  const safeValue = (val) => {
  if (!val) return "";
  if (typeof val === "object") return val.text || val.result || JSON.stringify(val);
  return String(val);
};

 const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentEntries = filteredUsers.slice(indexOfFirst, indexOfLast);


  return (
    <div className="app">
  
      <header className="navbar">
        <div className="logo">Texto</div>
      </header>

      
      <div className="signup-container">
      
        <div className="tab-buttons">
          <a
            href="#"
            className={`tab-link ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </a>
          <a
            href="#"
            className={`tab-link ${activeTab === "profiles" ? "active" : ""}`}
            onClick={() => setActiveTab("profiles")}
          >
            All Profiles
          </a>
          <a
            href="#"
            className={`tab-link ${activeTab === "segments" ? "active" : ""}`}
            onClick={() => setActiveTab("segments")}
          >
            List & Segments
          </a>
        </div>

        <section className="tab-content">
        
          {activeTab === "home" && (
            <div>
              <h2>Welcome to Texto</h2>
              <p>This is your dashboard home page.</p>
            </div>
          )}

          
          {activeTab === "profiles" && (
  <div className="profiles-section">
    <h2>All Profiles</h2>
    <input
      type="text"
      placeholder="🔍 Search by name or email"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-box"
    />

    {filteredUsers.length === 0 ? (
      <p className="no-entries">⚠️ No entries found.</p>
    ) : (
      <div className="table-container"> 
      
      <table className="profiles-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>First Active</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, index) => (
            <tr key={u.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{u.name}</td>
              <td>{safeValue(u.email)}</td>
              <td>{u.phone}</td>
              <td>{u.location}</td>
              <td>{formatDate(u.first_active)}</td>
              <td>{formatDate(u.last_updated)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

                
        




    )}
  </div>
)}


          
          
{activeTab === "segments" && (
  <div className="segments-section">
    <h2>List & Segments</h2>

    
    <input
      type="text"
      placeholder="🔍 Search segments..."
      className="segments-search"
    />

    
    <div className="segments-buttons">
    
           
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        id="fileUpload"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("file", file);

          try {
            const res = await fetch("http://localhost:5000/upload", {
              method: "POST",
              body: formData,
            });

            const data = await res.json();
            alert(data.message || "✅ File uploaded successfully!");

            
          } catch (err) {
            console.error("❌ Error uploading file:", err);
            alert("Failed to upload file.");
          }
        }}
      />

      <button
        className="btn add-segment"
        onClick={() => document.getElementById("fileUpload").click()}
      >
        Add List
      </button>
        <button className="btn add-segment"> Add Segment</button>
    </div>
  </div>
)}

        </section>
      </div>

      <footer className="footer">
        <div className="footer-logo">Texto</div>
        <div className="footer-grid">
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Press & Media</a>
            <a href="#">Customers</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Docs</h4>
            <a href="#">API</a>
            <a href="#">Help Document</a>
            <a href="#">Forum</a>
          </div>
          <div>
            <h4>Follow us</h4>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
            <a href="#">Medium</a>
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


*/

/*

import React, { useState, useEffect } from "react";
import "./frontpage.css";


const FrontendPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // fetch data from backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "profiles") {
      fetchUsers();
    }
  }, [activeTab]);

  // ✅ format date to only show yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())||
      u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
     
  );

  const safeValue = (val) => {
  if (!val) return "";
  if (typeof val === "object") return val.text || val.result || JSON.stringify(val);
  return String(val);
};


  return (
    <div className="app">
  
      <header className="navbar">
        <div className="logo">Texto</div>
      </header>

      
      <div className="signup-container">
      
        <div className="tab-buttons">
          <a
            href="#"
            className={`tab-link ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </a>
          <a
            href="#"
            className={`tab-link ${activeTab === "profiles" ? "active" : ""}`}
            onClick={() => setActiveTab("profiles")}
          >
            All Profiles
          </a>
          <a
            href="#"
            className={`tab-link ${activeTab === "segments" ? "active" : ""}`}
            onClick={() => setActiveTab("segments")}
          >
            List & Segments
          </a>
        </div>

        <section className="tab-content">
        
          {activeTab === "home" && (
            <div>
              <h2>Welcome to Texto</h2>
              <p>This is your dashboard home page.</p>
            </div>
          )}

          
          {activeTab === "profiles" && (
  <div className="profiles-section">
    <h2>All Profiles</h2>
    <input
      type="text"
      placeholder="🔍 Search by name or email"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-box"
    />

    {filteredUsers.length === 0 ? (
      <p className="no-entries">⚠️ No entries found.</p>
    ) : (
      <div className="table-container"> 
      
      <table className="profiles-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>First Active</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, index) => (
            <tr key={u.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{u.name}</td>
              <td>{safeValue(u.email)}</td>
              <td>{u.phone}</td>
              <td>{u.location}</td>
              <td>{formatDate(u.first_active)}</td>
              <td>{formatDate(u.last_updated)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
  </div>
)}


          
          
{activeTab === "segments" && (
  <div className="segments-section">
    <h2>List & Segments</h2>

    
    <input
      type="text"
      placeholder="🔍 Search segments..."
      className="segments-search"
    />

    
    <div className="segments-buttons">
    
           
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        id="fileUpload"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("file", file);

          try {
            const res = await fetch("http://localhost:5000/upload", {
              method: "POST",
              body: formData,
            });

            const data = await res.json();
            alert(data.message || "✅ File uploaded successfully!");

            
          } catch (err) {
            console.error("❌ Error uploading file:", err);
            alert("Failed to upload file.");
          }
        }}
      />

      <button
        className="btn add-segment"
        onClick={() => document.getElementById("fileUpload").click()}
      >
        Add List
      </button>
        <button className="btn add-segment"> Add Segment</button>
    </div>
  </div>
)}

        </section>
      </div>

      <footer className="footer">
        <div className="footer-logo">Texto</div>
        <div className="footer-grid">
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Press & Media</a>
            <a href="#">Customers</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Docs</h4>
            <a href="#">API</a>
            <a href="#">Help Document</a>
            <a href="#">Forum</a>
          </div>
          <div>
            <h4>Follow us</h4>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
            <a href="#">Medium</a>
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


*/
