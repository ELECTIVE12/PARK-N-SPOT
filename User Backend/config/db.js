require('./loadEnv');
const mongoose = require('mongoose');

let cached = global.__parkNSPOTMongo;

if (!cached) {
  cached = global.__parkNSPOTMongo = { conn: null, promise: null };
}

const getMongoUri = () =>
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL ||
  process.env.MONGO_URL;

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const mongoUri = getMongoUri();

  if (!mongoUri) {
    throw new Error(
      'Missing MongoDB connection string. Set MONGO_URI, MONGODB_URI, DATABASE_URL, or MONGO_URL.'
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
  }

  const conn = await cached.promise;
  cached.conn = conn;

  console.log(`MongoDB connected: ${conn.connection.host}`);
  return conn;
};

module.exports = connectDB;
