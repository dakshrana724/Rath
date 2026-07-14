const express = require('express');
const router = express.Router();
// const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { createBooking, getMyBookings, updateBookingStatus } = require('../controllers/bookingController');

// POST request to create a new booking
router.post('/', protect, createBooking);

// GET request to fetch the user's booking history
router.get('/mybookings', protect, getMyBookings);

router.put('/:id/status', updateBookingStatus);

module.exports = router;