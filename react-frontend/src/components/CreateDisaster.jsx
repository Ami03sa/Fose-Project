import React, { useState } from "react";
import "../App.css";

const CreateDisaster = () => {
  const [disasterName, setDisasterName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send data to your backend
    console.log({
      disasterName,
      location,
      description,
    });
    // Optionally, reset the form
    setDisasterName("");
    setLocation("");
    setDescription("");
    alert("Disaster created successfully!");
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create New Disaster Event</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Disaster Name:
          <input
            type="text"
            value={disasterName}
            onChange={(e) => setDisasterName(e.target.value)}
            required
            className="form-input"
          />
        </label>

        <label className="form-label">
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-input"
          />
        </label>

        <label className="form-label">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          />
        </label>

        <button type="submit" className="form-button">
          Create Disaster
        </button>
      </form>
    </div>
  );
};

export default CreateDisaster;
