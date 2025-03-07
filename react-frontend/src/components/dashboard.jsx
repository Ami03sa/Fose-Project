import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="options-box">
        <ul>
          <li>
            <button onClick={() => navigate("/request")}>Request Help</button>
          </li>
          <li>
            <button
              onClick={() => {
                alert("Respond to Help option selected");
                // You can also add more functionality here for responding to help
              }}
            >
              Respond to Help
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
