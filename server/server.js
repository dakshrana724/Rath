const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // Node's core HTTP module
const socketIo = require('socket.io'); // Import Socket.io

const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Create the HTTP server and wrap the Express app
const server = http.createServer(app);

// Initialize Socket.io and attach it to the server with CORS settings
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Your Vite frontend URL
    methods: ["GET", "POST", "PUT"]
  }
});

// Make the 'io' object accessible inside our route controllers!
// This is a super handy trick so we can emit events from anywhere in the app.
app.set('io', io);

// Body parser middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Mount Routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/mechanics', require('./routes/mechanicRoutes')); 

// Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);

  // When a user disconnects (closes the tab)
  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

// IMPORTANT: We now call server.listen() instead of app.listen()
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});