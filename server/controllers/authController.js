const User = require('../models/User');
const Mechanic = require('../models/Mechanic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user or mechanic
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if user exists in either collection
    const userExists = await User.findOne({ email });
    const mechanicExists = await Mechanic.findOne({ email });

    if (userExists || mechanicExists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;

    // Create the account in the correct collection based on role
    if (role === 'Mechanic') {
      newUser = await Mechanic.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });
    } else {
      newUser = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });
    }

    // Send back the user data and token
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id, newUser.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find the account based on the role they are trying to log in as
    let account;
    if (role === 'Mechanic') {
      account = await Mechanic.findOne({ email });
    } else {
      account = await User.findOne({ email });
    }

    if (!account) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, account.password);

    if (isMatch) {
      res.json({
        _id: account._id,
        name: account.name,
        email: account.email,
        role: account.role,
        token: generateToken(account._id, account.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};