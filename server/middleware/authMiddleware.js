const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Mechanic = require('../models/Mechanic');

const protect = async (req, res, next) => {
  let token;

  // Check if the request header contains a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token string
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check both collections to attach the correct user object to the request
      let account = await User.findById(decoded.id).select('-password');
      if (!account) {
        account = await Mechanic.findById(decoded.id).select('-password');
      }

      // Attach the user to the request object so the next route can use it
      req.user = account;
      next(); // Move to the actual route logic
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };