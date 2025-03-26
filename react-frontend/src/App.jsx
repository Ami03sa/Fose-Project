import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Request from "./components/Request";
import Signup from "./components/signup";
import Respond from "./components/Respond"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<Request />} />
        <Route path="/respond" element={<Respond/>} />
      </Routes>
    </Router>
  );
}

export default App;
