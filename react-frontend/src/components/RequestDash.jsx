import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const RequestDash = () => {
  const navigate = useNavigate();

  const recipientOptions = [
    { label: "Create Request", path: "/recipient/create-request" },
    { label: "Edit Request Items", path: "/recipient/edit-request" },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Recipient Dashboard</h1>
      <div className="card-grid">
        {recipientOptions.map((option, idx) => (
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

export default RequestDash;
