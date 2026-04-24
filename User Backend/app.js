const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const authRoutes = require('./routes/auth');
const googleRoutes = require('./routes/google');
const parkingRoutes = require('./routes/parking');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

const normalizeOrigin = (origin) => origin?.trim().replace(/\/+$/, '');

const envOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.ALLOWED_ORIGINS?.split(',') ?? []),
]
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOrigins = [
  'http://localhost:3000',
  'https://parknspott.com',
  'https://www.parknspott.com',
  'https://park-n-spot.vercel.app',
  ...envOrigins,
  /\.vercel\.app$/,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = normalizeOrigin(origin);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === normalizedOrigin : o.test(normalizedOrigin)
    );
    if (allowed) return callback(null, true);
    callback(new Error(`CORS blocked: ${normalizedOrigin}`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/auth/google', googleRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => res.json({ message: 'Park n Spot API running' }));

module.exports = app;
