import React, { useState } from "react";
import '../App.css'; // Import CSS file for styling

const Respond = () => {
  const [responses, setResponses] = useState([]);
  const [responseData, setResponseData] = useState({
    name: "",
    contact: "",
    assistanceType: "",
    additionalDetails: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponseData({
      ...responseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Response Data Submitted:", responseData);
    setResponses([...responses, responseData]);
    setSubmitted(true);
  };

  return (
    <div className="respond-help-page">
      <h1>Respond to Help Requests</h1>
      <p>Fill out the form below to offer assistance for those in need.</p>

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
