const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Step 1: Redirect user to Google
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2: Google redirects back here
router.get('/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    const token = generateToken(req.user._id);
    // Send token to frontend via URL param (frontend reads it on mount)
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}&name=${req.user.name}`);
  }
);

module.exports = router;