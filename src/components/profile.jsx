import React, { useState } from "react";
import "./Profile.css"; 



const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    first_active: "",
    last_updated: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name & Email are required!");
      return;
    }

    
    setUsers([...users, { ...formData, id: Date.now() }]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      first_active: "",
      last_updated: "",
      password: "",
    });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container">
      <h2>Profile Page</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="date" name="first_active" placeholder="First Active" value={formData.first_active} onChange={handleChange} />
        <input type="date" name="last_updated" placeholder="Last Updated" value={formData.last_updated} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Add Entry</button>
      </form>

      <h3>Entries</h3>
      {users.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <div className="table-container">
          <table>
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
                    <button className="delete-btn" onClick={() => handleDelete(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
