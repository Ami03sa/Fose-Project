import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="admin-options">
        <button onClick={() => navigate("/request")}>View All Requests</button>
        <button onClick={() => navigate("/respond")}>View All Responses</button>
        <button onClick={() => navigate("/dashboard")}>System Management</button>
      </div>
    </div>
  );
}

export default Admin;