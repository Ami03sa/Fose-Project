import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Request from "./components/Request";
import Signup from "./components/signup";
import Respond from "./components/Respond";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<Request />} />
        <Route path="/respond" element={<Respond />} />
        <Route path="/admin" element={<Respond />} />
      </Routes>
    </Router>
  );
}

export default App;
