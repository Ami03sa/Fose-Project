import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Request from './components/Request';
import Signup from './components/Signup';
import Respond from './components/Respond';
import Admin from './components/Admin';
import PasswordForget from './components/PasswordForget';  // Corrected import for PasswordForget component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<Request />} />
        <Route path="/respond" element={<Respond />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgot-password" element={<PasswordForget />} />  
      </Routes>
    </Router>
  );
}

export default App;
