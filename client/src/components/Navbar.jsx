import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const getStoredUser = () => {
  try {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('userToken');
    return userData && token ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Reads fresh user data automatically whenever the route changes
  const user = getStoredUser();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? 'text-[#1E5EFF] font-bold border-b-2 border-[#1E5EFF] pb-1 transition'
      : 'text-gray-600 font-medium hover:text-[#1E5EFF] pb-1 transition';
  };

  const isMechanic = user?.role?.toLowerCase() === 'mechanic';

  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50 font-sans">
      {/* Left: Brand Logo & Role-Aware Links */}
      <div className="flex items-center gap-10">
        <Link to="/" className="text-xl font-bold text-[#1E5EFF] hover:opacity-90 transition">
          FixMyRide
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className={getNavLinkClass('/')}>
            Home
          </Link>

          <Link to="/services" className={getNavLinkClass('/services')}>
            Services
        </Link>

          {user && !isMechanic && (
            <>
              <Link to="/dashboard" className={getNavLinkClass('/dashboard')}>
                My Bookings
              </Link>
              <Link to="/book" className={getNavLinkClass('/book')}>
                Book Repair
              </Link>
            </>
          )}

          {user && isMechanic && (
            <Link to="/mechanic-dashboard" className={getNavLinkClass('/mechanic-dashboard')}>
              Mechanic Portal
            </Link>
          )}
        </div>
      </div>

      {/* Right: Auth Controls */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <div className="text-sm">
              <span className="text-gray-500">Logged in as: </span>
              <span className="font-bold text-gray-900 capitalize">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 font-bold bg-red-50 rounded-lg hover:bg-red-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/login"
              className="font-bold text-gray-700 hover:text-[#1E5EFF] transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-[#FF7900] text-white font-bold rounded-lg hover:bg-[#e66d00] transition shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;