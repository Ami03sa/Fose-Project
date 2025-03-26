import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the username and password are correct
    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard if login is successful
    } else {
      alert("Invalid username or password. Please try again.");
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
