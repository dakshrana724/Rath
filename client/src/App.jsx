import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'; 
import Dashboard from './pages/Dashboard';
import BookingWizard from './pages/BookingWizard';
import MechanicDashboard from './pages/MechanicDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookingWizard />}/>
        <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;