const http = require('http');
const app = require('./app');
const connectDB = require('./config/db'); // ← FIXED: removed destructuring
const { initSocket } = require('./socket');
const { watchParkingSpots } = require('./services/parkingNotificationService');
const ParkingCache = require('./models/ParkingCache');
const User = require('./models/User'); // ← FIXED: moved out of inline require

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // 1. Connect to MongoDB first
    await connectDB();

    // 2. Create HTTP server from Express app
    const httpServer = http.createServer(app);

    // 3. Initialize Socket.IO and attach to HTTP server
    const io = initSocket(httpServer);

    // 4. Start the parking spot change stream watcher
    const getUserIdsForSpot = async (spot) => {
      const users = await User.find({ watchedSpots: spot._id }, '_id'); // ← FIXED: uses top-level import
      return users.map((u) => u._id);
    };

    watchParkingSpots(ParkingCache, getUserIdsForSpot, io);

    // 5. Start listening
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Server failed to start:', err.message);
    process.exit(1);
  }
};

start();