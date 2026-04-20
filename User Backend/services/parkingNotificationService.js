const Notification = require('../models/Notification');

const createNotification = async ({ userId, type, title, message, parkingSpotId = null, metadata = {}, io = null }) => {
  try {
    const notification = await Notification.create({ userId, type, title, message, parkingSpotId, metadata });
    if (io) io.to(`user:${userId}`).emit('notification:new', notification);
    return notification;
  } catch (err) {
    console.error('createNotification error:', err);
    return null;
  }
};

const notifyParkingAvailable = async ({ userId, spotName, parkingSpotId = null, metadata = {}, io = null }) => {
  return createNotification({
    userId,
    type: 'parking_available',
    title: '🅿️ Parking Space Available!',
    message: `A spot at ${spotName} is now available. Head over before it's taken!`,
    parkingSpotId,
    metadata,
    io,
  });
};

const notifyParkingFull = async ({ userId, spotName, parkingSpotId = null, metadata = {}, io = null }) => {
  return createNotification({
    userId,
    type: 'parking_full',
    title: '🚫 Parking Area Full',
    message: `${spotName} is currently full. We'll notify you when a spot opens up.`,
    parkingSpotId,
    metadata,
    io,
  });
};

const broadcastNotification = async ({ userIds, title, message, type = 'system', io = null }) => {
  try {
    const docs = userIds.map((userId) => ({ userId, type, title, message, isRead: false }));
    const notifications = await Notification.insertMany(docs);
    if (io) userIds.forEach((userId, i) => io.to(`user:${userId}`).emit('notification:new', notifications[i]));
    return notifications;
  } catch (err) {
    console.error('broadcastNotification error:', err);
    return [];
  }
};

const watchParkingSpots = (ParkingSpotModel, getUserIdsForSpot, io = null) => {
  const changeStream = ParkingSpotModel.watch(
    [{ $match: { operationType: { $in: ['update', 'replace'] } } }],
    { fullDocument: 'updateLookup' }
  );

  changeStream.on('change', async (change) => {
    const spot = change.fullDocument;
    if (!spot) return;
    const wasAvailable = change.updateDescription?.updatedFields?.availableSpaces;
    if (wasAvailable === undefined) return;

    const userIds = await getUserIdsForSpot(spot);
    if (!userIds || userIds.length === 0) return;

    const spotName = spot.name || spot.location || 'a nearby parking spot';

    for (const userId of userIds) {
      if (spot.availableSpaces > 0) {
        await notifyParkingAvailable({ userId, spotName, parkingSpotId: spot._id, metadata: { availableSpaces: spot.availableSpaces }, io });
      } else {
        await notifyParkingFull({ userId, spotName, parkingSpotId: spot._id, io });
      }
    }
  });

  changeStream.on('error', (err) => console.error('Change stream error:', err));
  console.log('✅ Parking spot watcher started');
  return changeStream;
};

module.exports = { createNotification, notifyParkingAvailable, notifyParkingFull, broadcastNotification, watchParkingSpots };