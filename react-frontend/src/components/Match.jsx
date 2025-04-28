import React from "react";
import "../App.css";


const MatchRequests = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Match Requests</h1>
      <p>Select a donor pledge and match it to a recipient's request.</p>

      <div className="match-section">
        <div className="requests-list">
          <h2>Recipient Requests</h2>
          {/* Example requests - you will later replace with real data */}
          <ul>
            <li>Request #1 - Food Supplies</li>
            <li>Request #2 - Blankets</li>
            <li>Request #3 - Medical Kits</li>
          </ul>
        </div>

        <div className="pledges-list">
          <h2>Donor Pledges</h2>
          {/* Example pledges - you will later replace with real data */}
          <ul>
            <li>Pledge #A - 100 Food Packages</li>
            <li>Pledge #B - 50 Blankets</li>
            <li>Pledge #C - 20 Medical Kits</li>
          </ul>
        </div>
      </div>

      <button className="match-button">Match Selected Request and Pledge</button>
    </div>
  );
};

export default MatchRequests;
