const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./config/passport'); // ← initializes Google strategy

const authRoutes = require('./routes/auth');
const googleRoutes = require('./routes/google');
const parkingRoutes = require('./routes/parking');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport (no session, we use JWT)
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/auth/google', googleRoutes); // ← FIXED: matches GOOGLE_CALLBACK_URL
app.use('/api/parking', parkingRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'Park n Spot API running' }));

module.exports = app;