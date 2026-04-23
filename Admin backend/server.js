const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const carparkRoutes = require('./routes/carparkRoutes');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const authRoutes = require('./routes/authRoutes');

const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/requestLogger');
const { startSyncScheduler } = require('./services/ltaService');

const app = express();

app.use(cors({ 
  origin: [
    'https://parknspott.com',
    'https://www.parknspott.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ], 
  credentials: true 
}));
app.use(express.json());
app.use(requestLogger);

app.use('/api/carparks', carparkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Park N Spot API is running', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    startSyncScheduler();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;