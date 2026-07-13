const Mechanic = require('../models/Mechanic');

// @desc    Get smart-matched mechanics nearby
// @route   GET /api/mechanics/nearby
// @access  Private
exports.getNearbyMechanics = async (req, res) => {
  try {
    // Expecting latitude and longitude to be passed as query parameters
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Please provide latitude and longitude' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    // MongoDB Aggregation Pipeline for Smart Matching
    const mechanics = await Mechanic.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distanceInMeters',
          maxDistance: 15000, // 15 km max radius
          spherical: true,
          query: { isAvailable: true, isVerified: true } // Only find available & verified mechanics
        }
      },
      {
        $addFields: {
          // Convert meters to kilometers for easier reading on the frontend
          distanceInKm: { $divide: ['$distanceInMeters', 1000] },
          
          // SMART SCORING ALGORITHM
          // Base score comes from rating (e.g., 4.9 * 10 = 49 points)
          // Subtract points for distance (e.g., -1 point per km)
          // Subtract points for current job load (e.g., -0.05 points per job)
          matchScore: {
            $subtract: [
              { $multiply: ['$averageRating', 10] }, 
              { 
                $add: [
                  { $divide: ['$distanceInMeters', 1000] }, 
                  { $multiply: ['$totalJobs', 0.05] } 
                ]
              }
            ]
          }
        }
      },
      {
        // Sort by the highest match score first
        $sort: { matchScore: -1 }
      },
      {
        // Hide passwords and private data from the frontend response
        $project: {
          password: 0,
          email: 0,
          phone: 0 
        }
      }
    ]);

    res.status(200).json(mechanics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};