import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const userData = { email, username, password };

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        credentials: 'include', // Important for CORS with credentials
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed. Please try again.");
      }

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Disaster Assistance Management System</h1>
      <div
        className="signup-box"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem" }}>Signup</h2>
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            style={{ padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              padding: "0.75rem", 
              borderRadius: "4px", 
              background: "#333", 
              color: "#fff", 
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#007bff", textDecoration: "underline" }}>
              Log in here
            </a>
          </p>
        </form>
      </div>
    </motion.div>
  );
}

export default Signup;