const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Mechanic' },
  
  isVerified: { type: Boolean, default: false },
  governmentIdUrl: { type: String },
  
  serviceCategories: [{ type: String }],
  serviceMode: { type: String, enum: ['Doorstep', 'Garage', 'Both'] },
  
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  
  averageRating: { type: Number, default: 0 },
  totalJobs: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  
  createdAt: { type: Date, default: Date.now }
});

mechanicSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Mechanic', mechanicSchema);