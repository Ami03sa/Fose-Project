import React, { useEffect, useState } from "react";
import "../App.css";

const ShippingAdvice = () => {
  const [requests, setRequests] = useState([]);
  const [adviceInputs, setAdviceInputs] = useState({});

  useEffect(() => {
    // Fetch all requests when page loads
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/requests");
        const data = await response.json();
        if (response.ok) {
          setRequests(data);
        } else {
          alert(data.error || "Failed to fetch requests.");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleAdviceChange = (requestId, value) => {
    setAdviceInputs({
      ...adviceInputs,
      [requestId]: value,
    });
  };

  const handleSubmitAdvice = async (requestId) => {
    const advice = adviceInputs[requestId];
    if (!advice) {
      alert("Please write advice before submitting.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/submit-advice/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ advice }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Advice submitted successfully!");
        // Optionally clear the input
        setAdviceInputs({
          ...adviceInputs,
          [requestId]: "",
        });
      } else {
        alert(data.error || "Failed to submit advice.");
      }
    } catch (error) {
      console.error("Error submitting advice:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="shipping-advice-page">
      <h1>Initiate Shipping Advice</h1>
      {requests.length === 0 ? (
        <p>Loading requests...</p>
      ) : (
        <div className="request-list">
          {requests.map((request) => (
            <div key={request.id} className="request-card">
              <h2>{request.name}</h2>
              <p><strong>Contact:</strong> {request.contact}</p>
              <p><strong>Location:</strong> {request.location}</p>
              <p><strong>Emergency Type:</strong> {request.emergencyType}</p>
              <p><strong>Urgency Level:</strong> {request.urgencyLevel}</p>
              <p><strong>Categories:</strong> {request.helpCategories?.join(", ")}</p>
              <p><strong>Details:</strong> {request.details}</p>

              <textarea
                placeholder="Write shipping advice here..."
                value={adviceInputs[request.id] || ""}
                onChange={(e) => handleAdviceChange(request.id, e.target.value)}
                className="advice-textarea"
              />

              <button
                onClick={() => handleSubmitAdvice(request.id)}
                className="submit-advice-button"
              >
                Submit Advice
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShippingAdvice;
