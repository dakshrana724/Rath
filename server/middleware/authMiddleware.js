const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Mechanic = require('../models/Mechanic');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get token from header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. 🔥 THE FIX: Check the role and search the correct database!
      if (decoded.role === 'Mechanic') {
        req.user = await Mechanic.findById(decoded.id).select('-password');
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }

      if (!req.user) {
         return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error("🛑 AUTH MIDDLEWARE ERROR:", error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

//  