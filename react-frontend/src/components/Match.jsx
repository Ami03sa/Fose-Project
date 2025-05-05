import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Match = () => {
  const [requests, setRequests] = useState([]);
  const [pledges, setPledges] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedPledge, setSelectedPledge] = useState(null);
  const [expandedRequests, setExpandedRequests] = useState([]);
  const [expandedPledges, setExpandedPledges] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/help-requests")
      .then(res => {
        setRequests(res.data.requests || []);
        setExpandedRequests(new Array(res.data.requests.length).fill(false));
      })
      .catch(err => console.error("Failed to load requests:", err));

    axios.get("http://localhost:5000/api/pledges")
      .then(res => {
        setPledges(res.data.pledges || []);
        setExpandedPledges(new Array(res.data.pledges.length).fill(false));
      })
      .catch(err => console.error("Failed to load pledges:", err));
  }, []);

  const toggleRequestDetails = (index) => {
    setExpandedRequests(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const togglePledgeDetails = (index) => {
    setExpandedPledges(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleMatch = () => {
    if (!selectedRequest || !selectedPledge) {
      alert("Please select both a request and a pledge.");
      return;
    }

    axios.post("http://localhost:5000/api/match", {
      requestId: selectedRequest,
      pledgeId: selectedPledge
    })
    .then(() => alert("Match successful!"))
    .catch(err => alert("Failed to match: " + err.message));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Match Requests</h1>
      <p>Select a donor pledge and match it to a recipient's request.</p>

      <div className="requests-grid">
        {requests.map((req, index) => (
          <div
            key={req.id}
            className={`request-card ${selectedRequest === req.id ? "selected" : ""} ${expandedRequests[index] ? "expanded" : ""}`}
            onClick={() => setSelectedRequest(req.id)}
          >
            <div
              className="request-header"
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering selection when toggling
                toggleRequestDetails(index);
              }}
            >
              {req.name}
              <span className="arrow">{expandedRequests[index] ? "▲" : "▼"}</span>
            </div>
            {expandedRequests[index] && (
              <div className="request-details">
                <p><strong>Contact:</strong> {req.contact}</p>
                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Emergency:</strong> {req.emergency_type}</p>
                <p><strong>Urgency:</strong> {req.urgency_level}</p>
                <p><strong>Help Needed:</strong> {req.help_categories}</p>
                <p><strong>Details:</strong> {req.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>Donor Pledges</h2>
      <div className="requests-grid">
        {pledges.map((pledge, index) => (
          <div
            key={pledge.id}
            className={`request-card ${selectedPledge === pledge.id ? "selected" : ""} ${expandedPledges[index] ? "expanded" : ""}`}
            onClick={() => setSelectedPledge(pledge.id)}
          >
            <div
              className="request-header"
              onClick={(e) => {
                e.stopPropagation();
                togglePledgeDetails(index);
              }}
            >
              {pledge.name}
              <span className="arrow">{expandedPledges[index] ? "▲" : "▼"}</span>
            </div>
            {expandedPledges[index] && (
              <div className="request-details">
                <p><strong>Contact:</strong> {pledge.contact}</p>
                <p><strong>Assistance:</strong> {pledge.assistance_type}</p>
                <p><strong>Details:</strong> {pledge.quantity_or_details}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="match-button" onClick={handleMatch} style={{ marginTop: "20px" }}>
        Match Selected Request and Pledge
      </button>
    </div>
  );
};

export default Match;
