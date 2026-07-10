const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Mechanic' },
  
  // Admin Verification Flow
  isVerified: { type: Boolean, default: false },
  governmentIdUrl: { type: String }, // Link to uploaded ID
  
  // Service Details
  serviceCategories: [{ type: String }], // e.g., ['Bike Repair', 'Oil Change']
  serviceMode: { type: String, enum: ['Doorstep', 'Garage', 'Both'] },
  
  // Geolocation for smart matching (Longitude, Latitude)
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  
  // Stats (Updated dynamically via Reviews)
  averageRating: { type: Number, default: 0 },
  totalJobs: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  
  createdAt: { type: Date, default: Date.now }
});

// Create a geospatial index for the smart matching algorithm
mechanicSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Mechanic', mechanicSchema);