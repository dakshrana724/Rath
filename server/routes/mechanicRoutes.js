const express = require('express');
const router = express.Router();
const { getNearbyMechanics } = require('../controllers/mechanicController');
const { protect } = require('../middleware/authMiddleware');

// GET request to fetch suggested mechanics (Protected because only logged-in users can book)
router.get('/nearby', protect, getNearbyMechanics);

module.exports = router;