const Booking = require('../models/Booking');

// @desc    Create a new repair booking
// @route   POST /api/bookings
// @access  Private (Customer only)
exports.createBooking = async (req, res) => {
  try {
    const { 
      vehicleDetails, 
      issueCategory, 
      serviceMode, 
      location, 
      scheduledFor, 
      repairNotes 
    } = req.body;

    // Optional: Add a quick check to ensure only Customers can book
    if (req.user.role !== 'Customer') {
      return res.status(403).json({ message: 'Only customers can create bookings' });
    }

    const booking = await Booking.create({
      customer: req.user._id, // Tied to the logged-in user!
      vehicleDetails,
      issueCategory,
      serviceMode,
      location,
      scheduledFor,
      repairNotes,
      status: 'Pending'
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ... existing imports and createBooking function ...

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private (Customer only)
exports.getMyBookings = async (req, res) => {
  try {
    // Find all bookings where the customer ID matches the logged-in user's ID
    const bookings = await Booking.find({ customer: req.user._id })
      .populate('mechanic', 'name phone averageRating') // Grabs mechanic details if assigned later
      .sort({ createdAt: -1 }); // Sorts by newest first

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc    Update booking status (Simulates mechanic action)
// @route   PUT /api/bookings/:id/status
// @access  Public (for testing MVP)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find the booking and update its status
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated document
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // 🔥 THE MAGIC: Broadcast the updated booking to the React frontend!
    req.app.get('io').emit('bookingStatusUpdated', booking);

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};