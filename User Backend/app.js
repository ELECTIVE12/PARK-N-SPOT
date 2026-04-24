const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./config/loadEnv');
require('./config/passport');

const authRoutes = require('./routes/auth');
const googleRoutes = require('./routes/google');
const parkingRoutes = require('./routes/parking');
const notificationRoutes = require('./routes/notificationRoutes');
const { isAllowedOrigin, normalizeOrigin } = require('./config/allowedOrigins');

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    if (isAllowedOrigin(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${normalizeOrigin(origin)}`));
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
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

module.exports = app;
