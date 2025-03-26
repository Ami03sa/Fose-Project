import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("user"); // Default selection
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = { username, password, accountType };

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please log in.");
        navigate("/"); // Redirect to login page
      } else {
        alert(data.error || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container">
      <h1>Disaster Assistance Management System</h1>
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="donor">Donor</option>
            <option value="recipient">Recipient</option>
          </select>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
