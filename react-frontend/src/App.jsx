import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Request from './components/Request';
import Signup from './components/Signup';
import Respond from './components/Respond';
import Admin from './components/Admin.jsx';
import AdminDash from './components/AdminDash.jsx';
import RespondDash from './components/RespondDash';
import RequestDash from './components/RequestDash';
import EditRequest from './components/EditRequest';
import PasswordForget from './components/PasswordForget';
import UpdateShip from './components/UpdateShip.jsx'; 
import ShipAdvice from './components/ShipAdvice.jsx';
import CreateDisaster from './components/CreateDisaster.jsx';
import Match from './components/Match.jsx';
import AdminMaintenance from "./components/AdminMaintenance.jsx";
import Pledge from "./components/Pledge.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Request" element={<Request />} />
        <Route path="/Recipient/create-request" element={<Request />} /> 
        <Route path="/Recipient/edit-request" element={<EditRequest />} />
        <Route path="/Forgot-Password" element={<PasswordForget />} />
        <Route path="/RequestDash" element={<RequestDash />} />
        <Route path="/donor/Pledge" element={<Pledge />} />


        {/* Donor Routes */}
        <Route path="/Donor/Respond" element={<Respond />} />
        <Route path="/Donor/shipped-status" element={<UpdateShip />} /> 
        <Route path="/RespondDash" element={<RespondDash />} />

        {/* Admin Routes */}
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminDash" element={<AdminDash />} />
        <Route path="/Admin/shipping-advice" element={<ShipAdvice />} />
        <Route path="/Admin/disaster-event" element={<CreateDisaster />} />
        <Route path="/Admin/match" element={<Match />} />
        <Route path="/Admin/items" element={<AdminMaintenance/>} />


      </Routes>
    </Router>
  );
}

export default App;
