import React, { useEffect, useState } from "react";
import "../App.css";

const UpdateShippedStatus = () => {
  const [pledges, setPledges] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // 🔹 Fetch pledges from backend (you'll need a route for this)
    fetch("http://localhost:5000/api/pledges")
      .then((res) => res.json())
      .then((data) => setPledges(data.pledges || []))
      .catch((err) => console.error("Error loading pledges:", err));
  }, []);

  const handleStatusChange = (pledgeId, status) => {
    setSelectedStatus({ ...selectedStatus, [pledgeId]: status });
  };

  const handleUpdate = (pledgeId) => {
    const updatedStatus = selectedStatus[pledgeId];
    if (!updatedStatus) return;

    // 🔹 Send update to backend (you need to implement this route too)
    fetch(`http://localhost:5000/api/pledges/${pledgeId}/update-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updatedStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccessMessage("Shipping status updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  return (
    <div className="update-shipping-page">
      <h1>Update Shipping Status</h1>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="pledges-grid">
        {pledges.map((pledge) => (
          <div key={pledge.id} className="pledge-card">
            <h3>{pledge.itemName}</h3>
            <p><strong>Recipient:</strong> {pledge.recipientName}</p>
            <p><strong>Quantity:</strong> {pledge.quantity}</p>

            <select
              value={selectedStatus[pledge.id] || ""}
              onChange={(e) => handleStatusChange(pledge.id, e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Shipped">Shipped</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>

            <button onClick={() => handleUpdate(pledge.id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateShippedStatus;
