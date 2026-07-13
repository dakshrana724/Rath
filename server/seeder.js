const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Mechanic = require('./models/Mechanic');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to the database
connectDB();

const seedMechanics = async () => {
  try {
    // Clear existing mechanics to prevent duplicates
    await Mechanic.deleteMany();
    console.log('Cleared existing mechanics...');

    // Hash a universal password for all dummy accounts
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const mechanics = [
      {
        name: 'Rajesh Sharma (Nearest - HSR Layout)',
        email: 'rajesh@fixmyride.com',
        phone: '9876543210',
        password: hashedPassword,
        isVerified: true,
        serviceCategories: ['Bike Repair', 'Oil Change', 'Engine Repair'],
        serviceMode: 'Doorstep',
        location: { type: 'Point', coordinates: [77.6387, 12.9121] }, // Close to Koramangala
        averageRating: 4.9,
        totalJobs: 212,
        isAvailable: true
      },
      {
        name: 'Aman Singh (Mid - Indiranagar)',
        email: 'aman@fixmyride.com',
        phone: '9876543211',
        password: hashedPassword,
        isVerified: true,
        serviceCategories: ['Car Repair', 'Tyre'],
        serviceMode: 'Both',
        location: { type: 'Point', coordinates: [77.6411, 12.9718] },
        averageRating: 4.8,
        totalJobs: 147,
        isAvailable: true
      },
      {
        name: 'Vikram Patel (Far - Whitefield)',
        email: 'vikram@fixmyride.com',
        phone: '9876543212',
        password: hashedPassword,
        isVerified: true,
        serviceCategories: ['Brake Service', 'Oil Change'],
        serviceMode: 'Garage',
        location: { type: 'Point', coordinates: [77.7499, 12.9698] },
        averageRating: 4.7,
        totalJobs: 89,
        isAvailable: true
      },
      {
        name: 'Suresh Kumar (Busy/Unavailable)',
        email: 'suresh@fixmyride.com',
        phone: '9876543213',
        password: hashedPassword,
        isVerified: true,
        serviceCategories: ['Battery', 'Engine Repair'],
        serviceMode: 'Doorstep',
        location: { type: 'Point', coordinates: [77.6200, 12.9300] }, // Very close!
        averageRating: 4.5,
        totalJobs: 400,
        isAvailable: false // We will use this to test that unavailable mechanics are filtered out
      }
    ];

    await Mechanic.insertMany(mechanics);
    console.log('Dummy mechanics successfully seeded! ');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedMechanics();