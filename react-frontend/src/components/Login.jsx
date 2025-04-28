import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Donor"); // Default role
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
      role,
    };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        // Navigate to role-specific dashboard
        if (role === "Donor") {
          navigate("/respond-dash"); // Donor -> RespondDash.jsx
        } else if (role === "Recipient") {
          navigate("/request-dash"); // Recipient -> RequestDash.jsx
        } else if (role === "Admin") {
          navigate("/admin-dash"); // Admin -> AdminDash.jsx
        }
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Disaster Assistance Management System</h1>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <div className="forgot-password-container">
            <span 
              className="forgot-password" 
              onClick={() => navigate("/forgot-password")}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              Forgot Password?
            </span>
          </div>
          <label>Select Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="Donor">Donor</option>
            <option value="Recipient">Recipient</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Login</button>
        </form>
        <p>
          No account?{" "}
          <button onClick={() => navigate("/signup")} className="signup-button">
            Sign Up!
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
