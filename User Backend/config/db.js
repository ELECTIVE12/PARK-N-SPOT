require('./loadEnv');
const mongoose = require('mongoose');

const getMongoUri = () =>
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL ||
  process.env.MONGO_URL;

const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    throw new Error(
      'Missing MongoDB connection string. Set MONGO_URI, MONGODB_URI, DATABASE_URL, or MONGO_URL.'
    );
  }

  const conn = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
