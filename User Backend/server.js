const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { initSocket } = require('./socket');
const { watchParkingSpots } = require('./services/parkingNotificationService');
const ParkingCache = require('./models/ParkingCache');
const User = require('./models/User');

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
let isServerListening = false;

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);

  if (!isServerListening) {
    process.exit(1);
  }
});

const start = async () => {
  try {
    await connectDB();

    const httpServer = http.createServer(app);
    let io = null;

    const getUserIdsForSpot = async (spot) => {
      const users = await User.find({ watchedSpots: spot._id }, '_id');
      return users.map((user) => user._id);
    };

    try {
      io = initSocket(httpServer);
    } catch (err) {
      console.error(
        'Socket.IO failed to initialize. Continuing without realtime features:',
        err.message
      );
    }

    try {
      watchParkingSpots(ParkingCache, getUserIdsForSpot, io);
    } catch (err) {
      console.error(
        'Parking watcher failed to start. Continuing without parking notifications:',
        err.message
      );
    }

    httpServer.listen(PORT, HOST, () => {
      isServerListening = true;
      console.log(`Server running on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err.message);
    process.exit(1);
  }
};

start();
