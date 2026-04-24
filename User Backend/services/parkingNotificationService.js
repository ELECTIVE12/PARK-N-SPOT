const Notification = require('../models/Notification');

const closeChangeStreamSafely = async (changeStream) => {
  try {
    await changeStream?.close();
  } catch (err) {
    console.error('Failed to close change stream cleanly:', err.message);
  }
};

const createNotification = async ({
  userId,
  type,
  title,
  message,
  parkingSpotId = null,
  metadata = {},
  io = null,
}) => {
  try {
    const notification = await Notification.create({
      userId,
      type,
      title,
      message,
      parkingSpotId,
      metadata,
    });

    if (io) {
      io.to(`user:${userId}`).emit('notification:new', notification);
    }

    return notification;
  } catch (err) {
    console.error('createNotification error:', err);
    return null;
  }
};

const notifyParkingAvailable = async ({
  userId,
  spotName,
  parkingSpotId = null,
  metadata = {},
  io = null,
}) =>
  createNotification({
    userId,
    type: 'parking_available',
    title: 'Parking Space Available!',
    message: `A spot at ${spotName} is now available. Head over before it's taken!`,
    parkingSpotId,
    metadata,
    io,
  });

const notifyParkingFull = async ({
  userId,
  spotName,
  parkingSpotId = null,
  metadata = {},
  io = null,
}) =>
  createNotification({
    userId,
    type: 'parking_full',
    title: 'Parking Area Full',
    message: `${spotName} is currently full. We'll notify you when a spot opens up.`,
    parkingSpotId,
    metadata,
    io,
  });

const broadcastNotification = async ({
  userIds,
  title,
  message,
  type = 'system',
  io = null,
}) => {
  try {
    const docs = userIds.map((userId) => ({
      userId,
      type,
      title,
      message,
      isRead: false,
    }));

    const notifications = await Notification.insertMany(docs);

    if (io) {
      notifications.forEach((notification) => {
        io.to(`user:${notification.userId}`).emit('notification:new', notification);
      });
    }

    return notifications;
  } catch (err) {
    console.error('broadcastNotification error:', err);
    return [];
  }
};

const watchParkingSpots = (ParkingSpotModel, getUserIdsForSpot, io = null) => {
  let changeStream;

  try {
    changeStream = ParkingSpotModel.watch(
      [{ $match: { operationType: { $in: ['update', 'replace'] } } }],
      { fullDocument: 'updateLookup' }
    );
  } catch (err) {
    console.error(
      'Failed to start change stream. Make sure MongoDB is running as a replica set.',
      err.message
    );
    return null;
  }

  changeStream.on('change', async (change) => {
    try {
      const spot = change.fullDocument;
      if (!spot) return;

      const availableSpaces =
        change.updateDescription?.updatedFields?.availableSpaces ??
        spot.availableSpaces;

      if (availableSpaces === undefined) return;

      const userIds = await getUserIdsForSpot(spot);
      if (!userIds || userIds.length === 0) return;

      const spotName = spot.name || spot.location || 'a nearby parking spot';

      for (const userId of userIds) {
        if (availableSpaces > 0) {
          await notifyParkingAvailable({
            userId,
            spotName,
            parkingSpotId: spot._id,
            metadata: { availableSpaces },
            io,
          });
        } else {
          await notifyParkingFull({ userId, spotName, parkingSpotId: spot._id, io });
        }
      }
    } catch (err) {
      console.error('Parking watcher change handling error:', err);
    }
  });

  changeStream.on('error', async (err) => {
    if (err.code === 40573) {
      console.error('Change streams require a MongoDB replica set. Parking watcher disabled.');
      await closeChangeStreamSafely(changeStream);
      return;
    }

    console.error('Change stream error:', err);
  });

  changeStream.on('close', () => {
    console.warn('Parking watcher stopped.');
  });

  console.log('Parking spot watcher started');
  return changeStream;
};

module.exports = {
  createNotification,
  notifyParkingAvailable,
  notifyParkingFull,
  broadcastNotification,
  watchParkingSpots,
};
