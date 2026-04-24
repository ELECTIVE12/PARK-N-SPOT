const express = require('express');
const jwt = require('jsonwebtoken');
const { passport, isGoogleAuthConfigured } = require('../config/passport');

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const googleDisabledHandler = (_req, res) => {
  res.status(503).json({
    message: 'Google login is not configured on the server.',
  });
};

if (isGoogleAuthConfigured) {
  router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    async (req, res) => {
      const token = generateToken(req.user._id);
      const name = encodeURIComponent(req.user.name);
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}&name=${name}`);
    }
  );
} else {
  router.get('/', googleDisabledHandler);
  router.get('/callback', googleDisabledHandler);
}

module.exports = router;
