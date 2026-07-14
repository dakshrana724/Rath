import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // 1. Hit our backend API
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      // 2. Save the VIP pass (JWT) and user data to local storage
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data));

      // 3. Redirect to the upcoming dashboard/booking wizard
      navigate('/dashboard'); 
      
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#1E5EFF] text-2xl mx-auto mb-4">
            🔧
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-2">Log in to manage your repairs and track mechanics.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E5EFF] focus:border-[#1E5EFF] outline-none transition"
              placeholder="dakshrana@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E5EFF] focus:border-[#1E5EFF] outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-[#1E5EFF] text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <a href="#" className="text-[#FF7900] font-bold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;