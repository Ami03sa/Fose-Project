import React, { useState } from "react";
import '../App.css'; // Import CSS file for styling

const Request = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    emergencyType: "",
    urgencyLevel: "",
    helpCategories: [],
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedCategories = [...formData.helpCategories];

    if (checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter((item) => item !== value);
    }

    setFormData({
      ...formData,
      helpCategories: updatedCategories,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="request-help-page">
      <h1>Request Help</h1>
      <p>Fill out the form below to request assistance. We’re here to help!</p>

      {submitted ? (
        <div className="success-message">
          <h2>Thank you for submitting your request!</h2>
          <p>We will review your request and get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Basic Information</h2>
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
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Type of Emergency:
              <select
                name="emergencyType"
                value={formData.emergencyType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="flood">Flood</option>
                <option value="earthquake">Earthquake</option>
                <option value="hurricane">Hurricane</option>
                <option value="fire">Fire</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Urgency Level:
              <select
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="urgent">Urgent</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </label>
          </div>

          <div className="form-section">
            <h2>Categories of Help Needed</h2>
            <label>
              <input
                type="checkbox"
                name="helpCategories"
                value="humanResources"
                onChange={handleCheckboxChange}
              />
              Human Resources (Rescuers, Volunteers, etc.)
            </label>
            <label>
              <input
                type="checkbox"
                name="helpCategories"
                value="financialAssistance"
                onChange={handleCheckboxChange}
              />
              Financial Assistance
            </label>
            <label>
              <input
                type="checkbox"
                name="helpCategories"
                value="foodAndWater"
                onChange={handleCheckboxChange}
              />
              Food and Water
            </label>
            <label>
              <input
                type="checkbox"
                name="helpCategories"
                value="clothingAndBedding"
                onChange={handleCheckboxChange}
              />
              Clothing and Bedding
            </label>
            <label>
              <input
                type="checkbox"
                name="helpCategories"
                value="medicalSupplies"
                onChange={handleCheckboxChange}
              />
              Medical Supplies
            </label>
            <label>
              <input
                type="checkbox"
                name="helpCategories"
                value="transportation"
                onChange={handleCheckboxChange}
              />
              Transportation
            </label>
            <label>
              <input
                type="checkbox"
                name="helpCategories"
                value="other"
                onChange={handleCheckboxChange}
              />
              Other
            </label>
          </div>

          <div className="form-section">
            <h2>Additional Details</h2>
            <label>
              Specify Quantities and Details:
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="e.g., 100 blankets, 50 kg of rice, etc."
              />
            </label>
          </div>

          <button type="submit">Submit Request</button>
        </form>
      )}
    </div>
  );
};

export default Request;
