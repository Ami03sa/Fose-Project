import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Request from "./components/Request";
import Signup from "./components/Signup";
import Respond from "./components/Respond"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<Request />} />
        <Route path="/respond" element={<Respond />} />
      </Routes>
    </Router>
  );
}

export default App;
