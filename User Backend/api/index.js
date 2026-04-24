const app = require('../app');
const connectDB = require('../config/db');

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error('Vercel function failed to initialize:', err);
    return res.status(500).json({
      message: 'Server failed to initialize',
      error: err.message,
    });
  }
};
