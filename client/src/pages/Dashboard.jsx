import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client'; // 1. Import Socket.io client!

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('userToken');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    } 
    
    setUser(JSON.parse(userData));
    fetchMyBookings(token);

    // --- 2. Initialize the WebSocket Connection ---
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('🔌 Connected to live updates!');
    });

    // 3. Listen for status updates from the server
    socket.on('bookingStatusUpdated', (updatedBooking) => {
      console.log('Live update received:', updatedBooking);
      
      // Instantly swap out the old booking data for the new data
      setBookings((prevBookings) => 
        prevBookings.map((booking) => 
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
    });

    // Cleanup the connection if the user leaves the dashboard
    return () => socket.disconnect();
    
  }, [navigate]);

  const fetchMyBookings = async (token) => {
    try {
      const response = await axios.get('/api/bookings/mybookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (!user) return null; 

  // --- Helper function for dynamic badge colors ---
  const getStatusColor = (status) => {
    switch(status?.toUpperCase()) {
      case 'PENDING': return 'bg-blue-50 text-blue-600';
      case 'ACCEPTED': return 'bg-yellow-50 text-yellow-600';
      case 'ON THE WAY': return 'bg-orange-50 text-orange-600';
      case 'COMPLETED': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#1E5EFF]">FixMyRide Dashboard</h2>
        <div className="flex items-center gap-6">
          <div className="text-sm">
            <span className="text-gray-500">Logged in as: </span>
            <span className="font-bold text-gray-900 capitalize">{user.name}</span>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-600 font-bold bg-red-50 rounded-lg hover:bg-red-100 transition">Logout</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
          <button onClick={() => navigate('/book')} className="px-6 py-2.5 bg-[#FF7900] text-white font-bold rounded-lg hover:bg-[#e66d00] transition shadow-md flex items-center gap-2">
            <span>+</span> New Repair
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your repairs...</div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No active bookings</h3>
            <p className="text-gray-500 mb-0">Your repair history will appear here once you make a request.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {/* Dynamic Badge Color! */}
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">
                      {new Date(booking.scheduledFor).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {booking.vehicleDetails.make} {booking.vehicleDetails.model}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {booking.issueCategory} • {booking.serviceMode}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Reg No.</p>
                  <p className="font-bold text-gray-900">{booking.vehicleDetails.registrationNumber}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;