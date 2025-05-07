import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AdminDash = () => {
  const navigate = useNavigate();

  const adminOptions = [
    { label: "Maintain Donation Items", path: "/admin/items" },
    { label: "Create Disaster Event", path: "/admin/disaster-event" },
    { label: " Manually Match Requests", path: "/admin/match" },
    { label: "Initiate Shipping Advice", path: "/admin/shipping-advice" },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="card-grid">
        {adminOptions.map((option, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            onClick={() => navigate(option.path)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDash;
