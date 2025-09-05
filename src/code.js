import React, { useState, useEffect } from "react";
import "./frontpage.css";
import Pagination from "./pagination"; 

const FrontendPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // ✅ pagination state
  const entriesPerPage = 10;