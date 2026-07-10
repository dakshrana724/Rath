const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('FixMyRide API is running...');
});

// Add this line to mount the auth routes!
app.use('/api/auth', require('./routes/authRoutes'));

// ... (existing code) ...

// Mount routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes')); // Add this line!



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});