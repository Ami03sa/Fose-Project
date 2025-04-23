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
import EditRequest from './components/EditRequest'; // Import EditRequest component
import PasswordForget from './components/PasswordForget';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<Request />} />
        <Route path="/recipient/create-request" element={<Request />} /> 
        <Route path="/donor/respond" element={<Respond />} /> 
        <Route path="/admin" element={<Admin />} />
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/requestdash" element={<RequestDash />} />
        <Route path="/responddash" element={<RespondDash />} />
        <Route path="/recipient/edit-request" element={<EditRequest />} /> 
        <Route path="/forgot-password" element={<PasswordForget />} />  
      </Routes>
    </Router>
  );
}

export default App;
