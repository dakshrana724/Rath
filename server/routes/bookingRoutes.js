const express = require('express');
const router = express.Router();
// const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { createBooking, getMyBookings, updateBookingStatus, getMechanicBookings } = require('../controllers/bookingController');
// POST request to create a new booking
router.post('/', protect, createBooking);

// GET request to fetch the user's booking history
router.get('/mybookings', protect, getMyBookings);
router.get('/mechanic', protect, getMechanicBookings);

router.put('/:id/status', updateBookingStatus);

// PUT /api/bookings/:id/status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body; 

    // 1. Update the document in MongoDB
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: status },
      { new: true } 
    ).populate('user', 'name email'); // Optional but helpful

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // 2. The Real-Time Socket.io Trigger!
    // This grabs the io instance from your server.js file
    const io = req.app.get('io');
    
    if (io) {
      // Broadcast the update to the frontend
      io.emit('bookingStatusUpdated', updatedBooking);
    }

    // 3. Send the response back to the Mechanic's Axios request
    res.status(200).json(updatedBooking);

  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
});

module.exports = router;