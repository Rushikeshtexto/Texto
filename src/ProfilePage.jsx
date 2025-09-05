/*import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="container">
      <h2>Profile Page</h2>
      <Link to="/form"><button>Add New Entry</button></Link>

      {users.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>First Active</th>
              <th>Last Updated</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.location}</td>
                <td>{u.first_active}</td>
                <td>{u.last_updated}</td>
                <td>{u.password}</td>
                <td>
                  <button onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // add search term state

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  // filter users based on searchTerm
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Profile Page</h2>
      <Link to="/form">
        <button>Add New Entry</button>
      </Link>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "10px 0", padding: "5px", width: "250px" }}
      />

      {filteredUsers.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>First Active</th>
              <th>Last Updated</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td >{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.location}</td>
                <td>{u.first_active}</td>
                <td>{u.last_updated}</td>
                <td>{u.password}</td>
                <td>
                  <button onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;

