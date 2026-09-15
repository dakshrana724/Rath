const Booking = require('../models/Booking');

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { vehicleDetails, issueCategory, serviceMode, scheduledFor, location, mechanicId } = req.body;
    const extractedUserId = req.user._id.toString();

    const booking = await Booking.create({
      user: extractedUserId,
      vehicleDetails,
      issueCategory,
      serviceMode,
      scheduledFor,
      location,
      mechanicId, 
      status: 'Pending'
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('🛑 BOOKING CREATION ERROR:', error); 
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/mybookings
exports.getMyBookings = async (req, res) => {
  try {
    // 🔥 Updated 'customer' to 'user' to match the new clean schema!
    const bookings = await Booking.find({ user: req.user._id })
      .populate('mechanicId', 'name phone averageRating') 
      .sort({ createdAt: -1 }); 

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update booking status (Simulates mechanic action)
// @route   PUT /api/bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } 
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    req.app.get('io').emit('bookingStatusUpdated', booking);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get bookings assigned to a specific mechanic
// @route   GET /api/bookings/mechanic
exports.getMechanicBookings = async (req, res) => {
  try {
    console.log("🛑 DIAGNOSTIC: Mechanic fetching jobs! Mechanic ID:", req.user._id);
    const bookings = await Booking.find({ mechanicId: req.user._id }).sort({ createdAt: -1 });
    console.log(`🛑 DIAGNOSTIC: Found ${bookings.length} jobs for this mechanic.`);
    res.status(200).json(bookings);
  } catch (error) {
    console.error('🛑 DIAGNOSTIC ERROR:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};