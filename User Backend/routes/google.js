const express = require('express');
const jwt = require('jsonwebtoken');
const { passport, isGoogleAuthConfigured } = require('../config/passport');

const router = express.Router();
const DEFAULT_CLIENT_URL = 'https://parknspott.com';

const normalizeClientUrl = (url) => {
  const trimmed = (url || DEFAULT_CLIENT_URL).trim().replace(/\/+$/, '');
  return trimmed;
};

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const googleDisabledHandler = (_req, res) => {
  res.status(503).json({
    message: 'Google login is not configured on the server.',
  });
};

if (isGoogleAuthConfigured) {
  router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

  const buildFailureRedirect = (req) => {
    const clientUrl = normalizeClientUrl(process.env.CLIENT_URL);
    return `${clientUrl}/login?error=google-auth-failed`;
  };

  router.get(
    '/callback',
    (req, res, next) => {
      passport.authenticate('google', {
        failureRedirect: buildFailureRedirect(req),
        session: false,
      })(req, res, next);
    },
    async (req, res) => {
      const token = generateToken(req.user._id);
      const name = encodeURIComponent(req.user.name);
      const clientUrl = normalizeClientUrl(process.env.CLIENT_URL);
      res.redirect(`${clientUrl}/auth-success?token=${token}&name=${name}`);
    }
  );
} else {
  router.get('/', googleDisabledHandler);
  router.get('/callback', googleDisabledHandler);
}

module.exports = router;
