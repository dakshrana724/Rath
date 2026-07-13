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


// app.use('/api/auth', require('./routes/authRoutes'));


// Mount routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes')); 
app.use('/api/mechanics', require('./routes/mechanicRoutes'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});