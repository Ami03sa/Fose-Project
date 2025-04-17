import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AdminDash = () => {
  const navigate = useNavigate();

  const adminOptions = [
    { label: "Maintain Donation Items", path: "/admin/items" },
    { label: "Create Disaster Event", path: "/admin/disaster-event" },
    { label: "Auto Match Requests", path: "/admin/match-auto" },
    { label: "Manual Match Requests", path: "/admin/match-manual" },
    { label: "Initiate Shipping Advice", path: "/admin/shipping-advice" },
  ];

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        {adminOptions.map((option, idx) => (
          <div key={idx} className="dashboard-card" onClick={() => navigate(option.path)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDash;
