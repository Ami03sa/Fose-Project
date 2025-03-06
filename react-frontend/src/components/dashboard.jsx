import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to the Dashboard</h1>
      <div className="options-box">
        <h2>What would you like to do?</h2>
        <ul>
          <li>
            <button onClick={() => navigate("/request")}>Request Help</button>
          </li>
          <li>
            <button onClick={() => alert("Respond to Help Selected")}>
              Respond to Help
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
