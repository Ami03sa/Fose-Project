import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const RespondDash = () => {
  const navigate = useNavigate();

  const donorOptions = [
    { label: "Respond to Request", path: "/donor/respond" },
    { label: "Make a Pledge", path: "/donor/pledge" },
    { label: "Update Shipped Status", path: "/donor/shipped-status" },
    { label: "Associate with Disaster", path: "/donor/disaster-association" },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Donor Dashboard</h1>
      <div className="card-grid">
        {donorOptions.map((option, idx) => (
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

export default RespondDash;
