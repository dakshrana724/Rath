import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const MechanicDashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('userToken');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    } 
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'Mechanic') {
      navigate('/dashboard');
      return;
    }

    setUser(parsedUser);
    fetchAssignedJobs(token);

    // Socket.io Real-Time Connection
    const socket = io('http://localhost:5000');
    
    socket.on('bookingStatusUpdated', (updatedJob) => {
      setJobs((prevJobs) => 
        prevJobs.map((job) => 
          job._id === updatedJob._id ? updatedJob : job
        )
      );
    });

    return () => socket.disconnect();
  }, [navigate]);

  const fetchAssignedJobs = async (token) => {
    try {
      const response = await axios.get('/api/bookings/mechanic', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (jobId, newStatus) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(`/api/bookings/${jobId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      // Instantly update the UI without waiting for a refresh
      setJobs((prevJobs) => 
        prevJobs.map((job) => 
          job._id === jobId ? response.data : job
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (!user) return null; 

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      

      <main className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-extrabold text-white mb-8">Assigned Jobs</h1>
        
        {loading ? (
          <div className="text-center py-12 text-slate-400">Scanning for nearby jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="bg-slate-800 p-12 rounded-2xl border border-slate-700 text-center">
            <div className="text-5xl mb-4">💤</div>
            <h3 className="text-xl font-bold text-white mb-2">No jobs assigned yet</h3>
            <p className="text-slate-400">Grab a coffee. We'll notify you when a request comes in.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                      job.status === 'Pending' ? 'bg-blue-500/20 text-blue-400' : 
                      job.status === 'Accepted' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {job.status}
                    </span>
                    <span className="text-sm text-slate-400 font-medium">
                      {new Date(job.scheduledFor).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {job.vehicleDetails.make} {job.vehicleDetails.model}
                  </h3>
                  <p className="text-slate-400 text-sm mb-1">
                    📍 {job.serviceMode} • {job.issueCategory}
                  </p>
                  <p className="text-slate-500 text-xs font-mono">
                    Reg: {job.vehicleDetails.registrationNumber}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  {job.status === 'Pending' && (
                    <button onClick={() => updateJobStatus(job._id, 'Accepted')} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition shadow-lg">
                      Accept Job
                    </button>
                  )}
                  {job.status === 'Accepted' && (
                    <button onClick={() => updateJobStatus(job._id, 'On the way')} className="px-6 py-2.5 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-500 transition shadow-lg">
                      Start Journey
                    </button>
                  )}
                  {job.status === 'On the way' && (
                    <button onClick={() => updateJobStatus(job._id, 'Completed')} className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition shadow-lg">
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MechanicDashboard;