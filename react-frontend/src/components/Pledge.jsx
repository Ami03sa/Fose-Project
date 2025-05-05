import React, { useState } from "react";
import '../App.css'; // Import your CSS

const Pledge = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    assistanceType: "",
    additionalDetails: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/pledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Pledge submitted:", data);
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to submit pledge.");
      }
    } catch (error) {
      console.error("Error submitting pledge:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="pledge-page">
      <h1>Offer a Pledge</h1>
      <p>You can pledge help even before a disaster occurs. Fill out the form below to let us know what you can offer.</p>

      {submitted ? (
        <div className="success-message">
          <h2>Thank you for your pledge!</h2>
          <p>We will match your assistance with those in need when the time comes.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Your Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Contact Information:
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Type of Assistance:
              <select
                name="assistanceType"
                value={formData.assistanceType}
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
            <h2>Details</h2>
            <label>
              Specify Quantities and Details:
              <textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleInputChange}
                placeholder="e.g., 100 blankets, transport van available, medical volunteers, etc."
              />
            </label>
          </div>

          <button type="submit">Submit Pledge</button>
        </form>
      )}
    </div>
  );
};

export default Pledge;
