import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="admin-options">
        <button onClick={() => navigate("/Request")}>View All Requests</button>
        <button onClick={() => navigate("/Respond")}>View All Responses</button>
        <button onClick={() => navigate("/Dashboard")}>System Management</button>
      </div>
    </div>
  );
}

export default Admin;