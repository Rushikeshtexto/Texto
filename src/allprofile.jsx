

import React ,{useState,useEffect} from "react";
//import Pagination from "./pagination"; 
import "./allprofile.css";
import {Link } from "react-router-dom";
  
const Profile=()=>{
    
    
    const [currentPage, setCurrentPage] = useState(1); // ✅ pagination state
    const entriesPerPage = 10;
   
    
    const[users,setUsers]=useState([]);

        const indexOfLast = currentPage * entriesPerPage;
         const indexOfFirst = indexOfLast - entriesPerPage;
         const [searchTerm, setSearchTerm] = useState("");
         const [pageInput, setPageInput] = useState(1);

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

  useEffect(()=>{

    setCurrentPage(1);
  },[searchTerm]);

useEffect(() => {
  setPageInput(currentPage);
}, [currentPage]);


 const fetchUsers =  () => {
      fetch("http://localhost:5000/users")
      .then(res=>res.json())
      .then(data=>setUsers(data))
      .catch(err=>console.error(err))
    };


  useEffect(()=>{ 
    fetchUsers();
  },[])



  
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
                          ><td>
                           <Link to={`/profile/${u.id}`} className="color"> {u.name}</Link></td>
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

                 
                 <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        {"<<"}
      </button>

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage-1)}
      >
        {"<"}
      </button>
<input
  className="searchpagination"
  type="number"
  min="1"
  max={totalPages}
  value={pageInput} // controlled by pageInput
  onChange={(e) => setPageInput(e.target.value)} // allow typing freely
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      let page = Number(pageInput);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page); // update current page
      } else {
        alert(`Page must be between 1 and ${totalPages}`);
        setPageInput(currentPage); // reset to current page if invalid
      }
    }
  }}
/>



      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {">"}
      </button>


    <button
    
    onClick={()=>setCurrentPage(totalPages)}
    >
{">>"}
      
    </button>

    </div>
 
                </>
              )}
            </div>
          


);




};
export default Profile;

