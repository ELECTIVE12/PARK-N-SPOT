const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'No account found with this email.' });
    }

    // If account has a googleId, always redirect to Google
    if (user.googleId) {
      return res.status(401).json({
        googleAccount: true,
        message: 'This account uses Google Sign-In.'
      });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/auth/me
router.put('/me', protect, async (req, res) => {
  try {
    const { name, username, email, mobile } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (username !== undefined) user.username = username;
    if (email) user.email = email;
    if (mobile !== undefined) user.mobile = mobile;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      username: updated.username,
      email: updated.email,
      mobile: updated.mobile,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/auth/change-password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.password) return res.status(400).json({ message: 'Google accounts cannot change password here.' });

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect.' });

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/locations
router.get('/locations', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('savedLocations');
    res.json({ success: true, data: user.savedLocations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/locations
router.post('/locations', protect, async (req, res) => {
  try {
    const { name, info, icon } = req.body;
    const user = await User.findById(req.user._id);
    user.savedLocations.push({ name, info, icon });
    await user.save();
    res.status(201).json({ success: true, data: user.savedLocations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/auth/locations/:id
router.delete('/locations/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedLocations = user.savedLocations.filter(
      loc => loc._id.toString() !== req.params.id
    );
    await user.save();
    res.json({ success: true, data: user.savedLocations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/history
router.get('/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('parkingHistory');
    res.json({ success: true, data: user.parkingHistory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/history
router.post('/history', protect, async (req, res) => {
  try {
    const { name, duration, date, status } = req.body;
    const user = await User.findById(req.user._id);
    user.parkingHistory.unshift({ name, duration, date, status });
    await user.save();
    res.status(201).json({ success: true, data: user.parkingHistory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;