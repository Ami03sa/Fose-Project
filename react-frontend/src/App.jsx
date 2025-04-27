import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Request from './components/Request';
import Signup from './components/Signup';
import Respond from './components/Respond';
import Admin from './components/Admin';
import AdminDash from './components/AdminDash';
import RespondDash from './components/RespondDash';
import RequestDash from './components/RequestDash';
import EditRequest from './components/EditRequest';
import PasswordForget from './components/PasswordForget';
import UpdateShip from './components/UpdateShip.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<Request />} />
        <Route path="/recipient/create-request" element={<Request />} /> 
        <Route path="/recipient/edit-request" element={<EditRequest />} />
        <Route path="/forgot-password" element={<PasswordForget />} />

        {/* Donor Routes */}
        <Route path="/donor/respond" element={<Respond />} />
        <Route path="/donor/shipped-status" element={<UpdateShip />} /> 
        <Route path="/responddash" element={<RespondDash />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/requestdash" element={<RequestDash />} />
      </Routes>
    </Router>
  );
}

export default App;
