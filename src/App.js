import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//import Signup from "./signup";  
//import Login from "./login"
import FrontendPage from "./frontpage";  

function App() {
  return (
    <Router>
      <Routes>
        
         <Route path="/" element={<Navigate to="/start" />} />
        <Route path="/start" element={<FrontendPage/>} />
       
        
      </Routes>
    </Router>
  );
}

export default App;
