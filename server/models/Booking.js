const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic' }, // Assigned after matching
  
  // Vehicle & Issue Details
  vehicleDetails: {
    make: String,
    model: String,
    registrationNumber: String
  },
  issueCategory: { type: String, required: true }, // e.g., 'Engine Repair'
  repairNotes: { type: String },
  
  // Service Logistics
  serviceMode: { type: String, enum: ['Doorstep', 'Garage'], required: true },
  location: {
    address: String,
    coordinates: [Number] // For doorstep mapping
  },
  scheduledFor: { type: Date, required: true },
  
  // Live Tracking Status
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'On The Way', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  
  // Pricing
  estimatedPriceRange: {
    min: Number,
    max: Number
  },
  finalPrice: { type: Number },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);