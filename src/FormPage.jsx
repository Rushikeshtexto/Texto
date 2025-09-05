/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    first_active: "",
    last_updated: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add user");

      alert("✅ User added successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("❌ Error adding user:", err);
      alert("Error adding user");
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="date" name="first_active" value={formData.first_active} onChange={handleChange} />
        <input type="date" name="last_updated" value={formData.last_updated} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FormPage;
*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define initialFormData outside the component
const initialFormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  first_active: "",
  last_updated: "",
  password: "",
};

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  // Reset form fields on page load
  useEffect(() => {
    setFormData(initialFormData);
  }, []); // empty dependency array is fine now

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add user");

      alert("✅ User added successfully!");
      navigate("/profile");

      // Optionally reset form after submit
      setFormData(initialFormData);
    } catch (err) {
      console.error("❌ Error adding user:", err);
      alert("Error adding user");
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="date" name="first_active" value={formData.first_active} onChange={handleChange} />
        <input type="date" name="last_updated" value={formData.last_updated} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FormPage;
