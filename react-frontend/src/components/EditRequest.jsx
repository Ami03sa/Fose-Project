import React, { useEffect, useState } from "react";
import "../App.css";

const EditRequest = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/my-requests");
        const data = await res.json();
        if (res.ok) setRequests(data);
        else throw new Error(data.error || "Failed to fetch requests");
      } catch (error) {
        console.error(error);
        setMessage("Error loading requests.");
      }
    };

    fetchRequests();
  }, []);

  const handleEditClick = (request) => {
    setSelectedRequest(request);
    setUpdatedData({ ...request });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const helpCategories = new Set(updatedData.helpCategories || []);
    if (checked) {
      helpCategories.add(value);
    } else {
      helpCategories.delete(value);
    }
    setUpdatedData({ ...updatedData, helpCategories: Array.from(helpCategories) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/update-request/${selectedRequest._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Request updated successfully!");
        setSelectedRequest(null);
      } else {
        throw new Error(data.error || "Update failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error updating request.");
    }
  };

  return (
    <div className="request-help-page">
      <h1>Edit My Requests</h1>
      {message && <p>{message}</p>}

      {!selectedRequest ? (
        <div>
          {requests.map((req) => (
            <div key={req._id} className="request-summary">
              <p><strong>Emergency Type:</strong> {req.emergencyType}</p>
              <p><strong>Urgency:</strong> {req.urgencyLevel}</p>
              <button onClick={() => handleEditClick(req)}>Edit</button>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={updatedData.name} onChange={handleChange} required />
          </label>
          <label>
            Contact:
            <input type="text" name="contact" value={updatedData.contact} onChange={handleChange} required />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={updatedData.location} onChange={handleChange} required />
          </label>
          <label>
            Type of Emergency:
            <select name="emergencyType" value={updatedData.emergencyType} onChange={handleChange} required>
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
            <select name="urgencyLevel" value={updatedData.urgencyLevel} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="urgent">Urgent</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </label>
          <h2>Categories of Help Needed</h2>
          {["humanResources", "financialAssistance", "foodAndWater", "clothingAndBedding", "medicalSupplies", "transportation", "other"].map(cat => (
            <label key={cat}>
              <input
                type="checkbox"
                value={cat}
                checked={updatedData.helpCategories?.includes(cat)}
                onChange={handleCheckboxChange}
              />
              {cat.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
          <label>
            Specify Quantities and Details:
            <textarea name="details" value={updatedData.details} onChange={handleChange} />
          </label>
          <button type="submit">Update Request</button>
        </form>
      )}
    </div>
  );
};

export default EditRequest;
