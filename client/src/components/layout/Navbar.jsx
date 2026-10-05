import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login'); // Redirect to your LoginPage
  };

  return (
    <nav className="bg-slate-900 px-8 py-4 flex justify-between items-center shadow-md">
      {/* Brand Logo / Home Link */}
      <Link to="/" className="text-2xl font-extrabold text-white flex items-center gap-2">
        <span className="text-[#FF7900]">🔧</span> FixMyRide
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        {!token ? (
          // What logged-out users see
          <>
            <Link to="/login" className="text-slate-300 hover:text-white font-medium transition">Login</Link>
          </>
        ) : (
          // What logged-in users see
          <>
            {userData?.role === 'Mechanic' ? (
              <Link to="/mechanic-dashboard" className="text-slate-300 hover:text-white font-medium transition">My Jobs</Link>
            ) : (
              <Link to="/dashboard" className="text-slate-300 hover:text-white font-medium transition">My Bookings</Link>
            )}
            
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 text-sm text-red-400 font-bold bg-slate-800 rounded-lg hover:bg-slate-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;