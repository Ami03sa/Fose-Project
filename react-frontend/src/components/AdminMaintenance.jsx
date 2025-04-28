import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const DonationItemMaintenance = () => {
  const [donationItems, setDonationItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", quantity: "" });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchDonationItems();
  }, []);

  const fetchDonationItems = () => {
    axios.get("/api/admin/donation-items")
      .then(response => {
        setDonationItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching donation items:", error);
        
      });
  };

  const handleAdd = () => {
    axios.post("/api/admin/donation-items", newItem)
      .then(() => {
        setNewItem({ name: "", description: "", quantity: "" });
        fetchDonationItems();
      })
      .catch(error => {
        console.error("Error adding donation item:", error);
              // TEMPORARY fake fallback
      setDonationItems([
        { id: 1, name: "Blankets", description: "Warm blankets", quantity: 100 },
        { id: 2, name: "Food Packages", description: "Non-perishable food", quantity: 200 },
      ]);
    });
      
  };

  const handleUpdate = (id) => {
    axios.put(`/api/admin/donation-items/${id}`, editingItem)
      .then(() => {
        setEditingItem(null);
        fetchDonationItems();
      })
      .catch(error => {
        console.error("Error updating donation item:", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/admin/donation-items/${id}`)
      .then(() => {
        fetchDonationItems();
      })
      .catch(error => {
        console.error("Error deleting donation item:", error);
      });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Donation Item Maintenance</h1>
      <p>View, add, modify, or delete donation items.</p>

      <div className="match-section">
        <div className="requests-list">
          <h2>Donation Items</h2>
          <ul>
            {donationItems.map((item) => (
              <li key={item.id}>
                {editingItem?.id === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      placeholder="Item Name"
                    />
                    <input
                      type="text"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      placeholder="Description"
                    />
                    <input
                      type="number"
                      value={editingItem.quantity}
                      onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                      placeholder="Quantity"
                    />
                    <button onClick={() => handleUpdate(item.id)}>Save</button>
                    <button onClick={() => setEditingItem(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {item.name} - {item.description} - {item.quantity} 
                    <button onClick={() => setEditingItem(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="pledges-list">
          <h2>Add New Donation Item</h2>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item Name"
          />
          <input
            type="text"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            placeholder="Quantity"
          />
          <button onClick={handleAdd}>Add Donation Item</button>
        </div>
      </div>
    </div>
  );
};

export default DonationItemMaintenance;
