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

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: status },
      { new: true } 
    ).populate('user', 'name email'); 

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const io = req.app.get('io');
    
    if (io) {
      io.emit('bookingStatusUpdated', updatedBooking);
    }
    res.status(200).json(updatedBooking);

  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
});

module.exports = router;