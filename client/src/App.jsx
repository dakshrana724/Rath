import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layout
import Layout from './components/Layout';

// Import Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MechanicDashboard from './pages/MechanicDashboard';
import BookingWizard from './pages/BookingWizard';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Pages WITH shared white Navbar */}
      <Route element={<Layout />}>
        <Route path="/services" element={<ServicesPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mechanic-dashboard"
          element={
            <ProtectedRoute>
              <MechanicDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookingWizard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Pages WITHOUT shared white Navbar */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;