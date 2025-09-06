

import React ,{useState,useEffect} from "react";
import Pagination from "./pagination"; 
const Profile=()=>{
    
    
    const [currentPage, setCurrentPage] = useState(1); // ✅ pagination state
    const entriesPerPage = 10;
    
    const[users,setUsers]=useState([]);

        const indexOfLast = currentPage * entriesPerPage;
         const indexOfFirst = indexOfLast - entriesPerPage;
         const [searchTerm, setSearchTerm] = useState("");

         const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );
        const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
        const currentEntries = filteredUsers.slice(indexOfFirst, indexOfLast);
       
                        
          const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };


          const safeValue = (val) => {
    if (!val) return "";
    if (typeof val === "object")
      return val.text || val.result || JSON.stringify(val);
    return String(val);
  };

  
  const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        console.log("✅ Users fetched:", data); // <-- Add this
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
 useEffect(() => {
    {
      fetchUsers();
    }
  }, []);

  
return(

            <div className="profiles-section">
              <h2>Profiles</h2>
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

                 
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          


);




};
export default Profile;

/*
import React, { useState, useEffect } from "react";
import Pagination from "./pagination"; 

const Profile = () => {
  const [currentPage, setCurrentPage] = useState(1); // ✅ pagination state
  const entriesPerPage = 10;
  const [users, setUsers] = useState([]); // ✅ FIXED
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch users function
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ✅ Run only once when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination + Search
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const currentEntries = filteredUsers.slice(indexOfFirst, indexOfLast);

  // Helpers
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const safeValue = (val) => {
    if (!val) return "";
    if (typeof val === "object")
      return val.text || val.result || JSON.stringify(val);
    return String(val);
  };

  return (
    <div className="profiles-section">
      <h2>Profiles</h2>
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

         
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
*/