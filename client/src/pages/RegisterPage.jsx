import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Customer',
    specialties: '', // New field for mechanics
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Prepare the payload
      let payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      };

      // 2. Add specific fields if they are a mechanic
      if (formData.role === 'Mechanic') {
        payload.specialties = formData.specialties.split(',').map(s => s.trim());
        
        // Supplying a default GeoJSON location (Koramangala coordinates) for testing
        // In a production app, you'd get this from the browser's Geolocation API
        payload.location = {
          type: 'Point',
          coordinates: [77.6186, 12.9345] 
        };
      }

      // 3. Send to your authController
      await axios.post('/api/auth/register', payload);
      
      // On success, send them to login!
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 bg-[#1E5EFF] rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
          🔧
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I want to sign up as a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'Customer' })}
                  className={`py-2 text-sm font-bold rounded-lg border-2 transition-all ${
                    formData.role === 'Customer' 
                      ? 'border-[#1E5EFF] bg-blue-50 text-[#1E5EFF]' 
                      : 'border-gray-200 text-gray-500 hover:border-blue-200'
                  }`}
                >
                  🚗 Customer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'Mechanic' })}
                  className={`py-2 text-sm font-bold rounded-lg border-2 transition-all ${
                    formData.role === 'Mechanic' 
                      ? 'border-[#FF7900] bg-orange-50 text-[#FF7900]' 
                      : 'border-gray-200 text-gray-500 hover:border-orange-200'
                  }`}
                >
                  👨‍🔧 Mechanic
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} 
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} 
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} 
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} 
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" />
            </div>

            {/* DYNAMIC FIELD: Only shows if Mechanic is selected */}
            {formData.role === 'Mechanic' && (
              <div className="animate-fade-in p-4 bg-orange-50 border border-orange-100 rounded-lg">
                <label className="block text-sm font-medium text-gray-900">Specialties (comma separated)</label>
                <input type="text" name="specialties" required value={formData.specialties} onChange={handleChange} 
                  placeholder="e.g. Engine, Brakes, Honda"
                  className="mt-1 w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF7900] outline-none" />
                <p className="text-xs text-gray-500 mt-2">Note: Your location will be automatically set to your current service area.</p>
              </div>
            )}

            <button type="submit" disabled={loading} 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#1E5EFF] hover:bg-blue-700 transition disabled:opacity-70">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#FF7900] hover:text-[#e66d00] transition">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;