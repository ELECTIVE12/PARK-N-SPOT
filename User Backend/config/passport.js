const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');

const DEFAULT_BACKEND_URL = 'https://park-n-spot-production.up.railway.app';

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:
    process.env.GOOGLE_CALLBACK_URL ||
    `${process.env.BACKEND_URL || DEFAULT_BACKEND_URL}/auth/google/callback`,
};

const isGoogleAuthConfigured = Boolean(
  googleConfig.clientID &&
  googleConfig.clientSecret &&
  googleConfig.callbackURL
);

if (isGoogleAuthConfigured) {
  passport.use(
    new GoogleStrategy(
      googleConfig,
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.trim().toLowerCase();
          if (!email) return done(new Error('No email from Google'), null);

          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email,
              googleId: profile.id,
              isVerified: true,
            });
          } else if (!user.googleId) {
            user.googleId = profile.id;
            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpires = undefined;
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
} else {
  console.warn(
    'Google OAuth disabled: missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_CALLBACK_URL.'
  );
}

module.exports = { passport, isGoogleAuthConfigured };
