import React, { useEffect, useState } from "react";
import '../App.css';

const Respond = () => {
  const [responses, setResponses] = useState([]);
  const [requests, setRequests] = useState([]); // 🔹 to store help requests
  const [expandedCards, setExpandedCards] = useState([]);

  const [responseData, setResponseData] = useState({
    name: "",
    contact: "",
    assistanceType: "",
    additionalDetails: ""
  });

  const [submitted, setSubmitted] = useState(false);

  // 🔹 Fetch help requests from backend on page load
  useEffect(() => {
    fetch("http://localhost:5000/api/help-requests")
      .then((res) => res.json())
      .then((data) => {
        const fetchedRequests = data.requests || [];
        setRequests(fetchedRequests);
        setExpandedCards(new Array(fetchedRequests.length).fill(false));
      })
      .catch((err) => console.error("Error loading requests:", err));
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponseData({ ...responseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Response Data Submitted:", responseData);
    setResponses([...responses, responseData]);
    setSubmitted(true);
  };

  const toggleDetails = (index) => {
    setExpandedCards((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index]; // Toggle only the clicked one
      return updated;
    });
  };
  

  return (
    <div className="respond-help-page">
      <h1>Respond to Help Requests</h1>
      <p>Fill out the form below to offer assistance for those in need.</p>

      <div className="requests-grid">
  {requests.map((req, index) => (
    <div key={req.id} className={`request-card ${expandedCards[index] ? "expanded" : ""}`}>
    <div
        className="request-header"
        onClick={() => toggleDetails(index)}
      >
        {req.name}
        <span className="arrow">{expandedCards[index] ? "▲" : "▼"}</span>
      </div>
      {expandedCards[index] && (
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


      {/* 📝 Response form */}
      {submitted ? (
        <div className="success-message">
          <h2>Thank you for your response!</h2>
          <p>We will match your assistance with those in need.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Responder Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={responseData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Contact Information:
              <input
                type="text"
                name="contact"
                value={responseData.contact}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Type of Assistance:
              <select
                name="assistanceType"
                value={responseData.assistanceType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="humanResources">Human Resources</option>
                <option value="financialAssistance">Financial Assistance</option>
                <option value="foodAndWater">Food and Water</option>
                <option value="clothingAndBedding">Clothing and Bedding</option>
                <option value="medicalSupplies">Medical Supplies</option>
                <option value="transportation">Transportation</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="form-section">
            <h2>Additional Details</h2>
            <label>
              Specify Quantities and Details:
              <textarea
                name="additionalDetails"
                value={responseData.additionalDetails}
                onChange={handleInputChange}
                placeholder="e.g., 100 blankets, 50 kg of rice, etc."
              />
            </label>
          </div>

          <button type="submit">Submit Response</button>
        </form>
      )}
    </div>
  );
};

export default Respond;
