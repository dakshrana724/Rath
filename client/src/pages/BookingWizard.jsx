import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Master state for all form steps
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    registrationNumber: '',
    issueCategory: 'General Service',
    serviceMode: 'Doorstep',
    scheduledFor: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('userToken');
      
      // Formatting the payload to match our Mongoose Schema perfectly
      const payload = {
        vehicleDetails: {
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year),
          registrationNumber: formData.registrationNumber
        },
        issueCategory: formData.issueCategory,
        serviceMode: formData.serviceMode,
        scheduledFor: formData.scheduledFor,
        // Hardcoding our Koramangala test coordinates for the MVP
        location: {
          type: 'Point',
          coordinates: [77.6186, 12.9345] 
        }
      };

      await axios.post('/api/bookings', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Boom! Redirect back to dashboard to see the new booking
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 font-sans px-4">
      
      {/* Header & Progress Bar */}
      <div className="max-w-2xl w-full mb-8">
        <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-blue-600 font-medium mb-6 flex items-center gap-2">
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Book a Repair</h1>
        <div className="flex gap-2 mb-2">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-[#1E5EFF]' : 'bg-gray-200'}`}></div>
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-[#1E5EFF]' : 'bg-gray-200'}`}></div>
          <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-[#1E5EFF]' : 'bg-gray-200'}`}></div>
        </div>
        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Step {step} of 3</p>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

        {/* STEP 1: Vehicle Info */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Vehicle Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <input type="text" name="make" value={formData.make} onChange={handleChange} placeholder="e.g. Honda" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. Civic" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 2021" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reg Number</label>
                <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="e.g. KA 01 AB 1234" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" required />
              </div>
            </div>
            <div className="pt-4 text-right">
              <button onClick={nextStep} disabled={!formData.make || !formData.model} className="px-6 py-2.5 bg-[#1E5EFF] text-white font-bold rounded-lg hover:bg-blue-700 transition">Next ➔</button>
            </div>
          </div>
        )}

        {/* STEP 2: Service Info */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Service Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Category</label>
              <select name="issueCategory" value={formData.issueCategory} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none">
                <option>General Service</option>
                <option>Oil Change</option>
                <option>Brake Repair</option>
                <option>Engine Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Mode</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="serviceMode" value="Doorstep" checked={formData.serviceMode === 'Doorstep'} onChange={handleChange} className="w-4 h-4 text-[#1E5EFF]" /> Doorstep
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="serviceMode" value="Garage" checked={formData.serviceMode === 'Garage'} onChange={handleChange} className="w-4 h-4 text-[#1E5EFF]" /> Garage Visit
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" name="scheduledFor" value={formData.scheduledFor} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E5EFF] outline-none" required />
            </div>
            <div className="pt-4 flex justify-between">
              <button onClick={prevStep} className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition">← Back</button>
              <button onClick={nextStep} disabled={!formData.scheduledFor} className="px-6 py-2.5 bg-[#1E5EFF] text-white font-bold rounded-lg hover:bg-blue-700 transition">Next ➔</button>
            </div>
          </div>
        )}

        {/* STEP 3: Confirm */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Confirm Booking</h2>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">{formData.make} {formData.model} ({formData.year})</h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div><span className="text-gray-500 block">Reg Number</span><span className="font-semibold text-gray-800">{formData.registrationNumber}</span></div>
                <div><span className="text-gray-500 block">Date</span><span className="font-semibold text-gray-800">{formData.scheduledFor}</span></div>
                <div><span className="text-gray-500 block">Issue</span><span className="font-semibold text-gray-800">{formData.issueCategory}</span></div>
                <div><span className="text-gray-500 block">Mode</span><span className="font-semibold text-[#FF7900]">{formData.serviceMode}</span></div>
              </div>
            </div>
            <div className="pt-4 flex justify-between">
              <button onClick={prevStep} className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition">← Edit</button>
              <button onClick={handleSubmit} disabled={loading} className="px-8 py-2.5 bg-[#FF7900] text-white font-bold rounded-lg hover:bg-[#e66d00] transition shadow-md">
                {loading ? 'Confirming...' : 'Confirm & Book'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;