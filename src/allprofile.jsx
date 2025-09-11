

import React ,{useState,useEffect} from "react";
//import Pagination from "./pagination"; 
import Pagination from "./pagination";
import styles from  "./allprofile.module.css";
import {Link } from "react-router-dom";
  
const Profile=()=>{
    
    
    const [currentPage, setCurrentPage] = useState(1); 
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

            <div className={styles.profilessection}>
              <h2>Profiles</h2>
              <input
                type="text"
                placeholder="🔍 Search "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchbox}
              />

              {currentEntries.length === 0 ? (
                <p className={styles.noentries}>⚠️ No entries found.</p>
              ) : (
                <>
                  <div className={styles.tablecontainer}>
                    <table className={styles.profilestable}>
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
                            className={index % 2 === 0 ? styles.evenrow : styles.oddrow}
                          ><td>
                           <Link to={`/profile/${u.id}`} className={styles.color}> {u.name}</Link></td>
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

