import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MechanicDashboard from './pages/MechanicDashboard';
import BookingWizard from './pages/BookingWizard';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/services" element={<ServicesPage />} /> 
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
      <Route path="/book" element={<BookingWizard />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;