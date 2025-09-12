import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import Dropdown from "./dropdown";
import DisplayRange from "./displayrange";
import UserDetails from "./UserDetails"; // ✅ import

import styles from "./allprofile.module.css";

const Profile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleItemsPerPageChange = (e) => {
    const newValue = parseInt(e.target.value);
    setEntriesPerPage(newValue);
    setCurrentPage(1);
  };

  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.profilessection}>
      {/* ✅ Switch between list view and details view */}
      {selectedUser ? (
        <UserDetails
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
          formatDate={formatDate}
        />
      ) : (
        <>
          <h2>Profiles</h2>

          {/* Search */}
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
              {/* Table */}
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
                    {currentEntries.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <span
                            className={styles.color}
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedUser(u)} // ✅ open details
                          >
                            {u.name}
                          </span>
                        </td>
                        <td>{maskEmail(safeValue(u.email))}</td>
                        <td>{maskPhone(u.phone)}</td>
                        <td>{u.location}</td>
                        <td>{formatDate(u.first_active)}</td>
                        <td>{formatDate(u.last_updated)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer: dropdown + pagination */}
              <div className={styles.paginationcontainer}>
                <Dropdown
                  entriesPerPage={entriesPerPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />

                <DisplayRange
                  currentPage={currentPage}
                  entriesPerPage={entriesPerPage}
                  totalItems={filteredUsers.length}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
