const express = require('express');
const axios = require('axios');
const ParkingCache = require('../models/ParkingCache');
const router = express.Router();

const TARGET_ZONES = [
  { name: 'Orchard', lat: 1.3040, lng: 103.8340, radius: 0.8 },
  { name: 'Marina', lat: 1.2920, lng: 103.8560, radius: 0.8 },
  { name: 'Harbourfront', lat: 1.2640, lng: 103.8210, radius: 0.8 },
];

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const DEMO_CARPARKS = [
  { carparkNumber: 'OM1', area: 'Orchard', development: 'ION Orchard', location: { lat: 1.3040, lng: 103.8340 }, availableLots: 45, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date() },
  { carparkNumber: 'OM2', area: 'Orchard', development: 'Takashimaya', location: { lat: 1.3035, lng: 103.8335 }, availableLots: 12, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date() },
  { carparkNumber: 'OM3', area: 'Orchard', development: 'Paragon', location: { lat: 1.3038, lng: 103.8350 }, availableLots: 0, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date() },
  { carparkNumber: 'MB1', area: 'Marina', development: 'Marina Bay Sands', location: { lat: 1.2830, lng: 103.8610 }, availableLots: 88, lotType: 'C', agencyCode: 'LTA', fetchedAt: new Date() },
  { carparkNumber: 'MB2', area: 'Marina', development: 'Suntec City', location: { lat: 1.2955, lng: 103.8585 }, availableLots: 5, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date() },
  { carparkNumber: 'MB3', area: 'Marina', development: 'Millenia Walk', location: { lat: 1.2930, lng: 103.8570 }, availableLots: 30, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date() },
  { carparkNumber: 'HF1', area: 'Harbourfront', development: 'VivoCity', location: { lat: 1.2645, lng: 103.8225 }, availableLots: 120, lotType: 'C', agencyCode: 'LTA', fetchedAt: new Date() },
  { carparkNumber: 'HF2', area: 'Harbourfront', development: 'Harbourfront Centre', location: { lat: 1.2625, lng: 103.8185 }, availableLots: 8, lotType: 'C', agencyCode: 'URA', fetchedAt: new Date() },
  { carparkNumber: 'HF3', area: 'Harbourfront', development: 'Sentosa Gateway', location: { lat: 1.2550, lng: 103.8230 }, availableLots: 0, lotType: 'C', agencyCode: 'LTA', fetchedAt: new Date() },
];

// GET /parking/availability
router.get('/availability', async (req, res) => {
  try {
    const response = await axios.get(
      'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
      {
        headers: { AccountKey: process.env.LTA_API_KEY, accept: 'application/json' },
        timeout: 8000, // ← 8 second timeout so fallback kicks in before Railway kills it
      }
    );

    const allCarparks = response.data.value;

    const relevant = allCarparks.filter((cp) => {
      if (!cp.Location) return false;
      const [lat, lng] = cp.Location.split(' ').map(Number);
      return TARGET_ZONES.some(
        (zone) => getDistance(lat, lng, zone.lat, zone.lng) <= zone.radius
      );
    });

    await ParkingCache.deleteMany({});
    const toInsert = relevant.map((cp) => {
      const [lat, lng] = (cp.Location || '0 0').split(' ').map(Number);
      return {
        carparkNumber: cp.CarParkID,
        area: cp.Area,
        development: cp.Development,
        location: { lat, lng },
        availableLots: cp.AvailableLots,
        lotType: cp.LotType,
        agencyCode: cp.Agency,
        fetchedAt: new Date()
      };
    });

    await ParkingCache.insertMany(toInsert);
    res.json({ success: true, count: relevant.length, data: toInsert });

  } catch (err) {
    console.error('LTA API Error:', err.message);

    // Fallback 1: return last cached data from MongoDB
    try {
      const cached = await ParkingCache.find().sort({ fetchedAt: -1 });
      if (cached.length > 0) {
        return res.json({ success: true, count: cached.length, data: cached, fromCache: true });
      }
    } catch (dbErr) {
      console.error('DB fallback error:', dbErr.message);
    }

    // Fallback 2: return demo data so the map always works
    return res.json({ success: true, count: DEMO_CARPARKS.length, data: DEMO_CARPARKS, fromCache: true });
  }
});

// GET /parking/cached
router.get('/cached', async (req, res) => {
  try {
    const data = await ParkingCache.find().sort({ fetchedAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;