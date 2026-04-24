# Park 'n Spot — API & Database Documentation

This document explains every API endpoint and how MongoDB is connected to the application.

---

## Base URL

**Local development:** `http://localhost:5000`

**Production (Railway):** `https://park-n-spot-production.up.railway.app`

---

## Authentication (`/api/auth`)

All auth routes (except login/signup) require a Bearer token in the header:

```
Authorization: Bearer <your_jwt_token>
```

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/signup` | Create a new user account | No |
| `POST` | `/api/auth/login` | Login with email and password | No |
| `GET` | `/api/auth/me` | Get current user profile | Yes |
| `PUT` | `/api/auth/me` | Update profile (name, email, username, mobile) | Yes |
| `PUT` | `/api/auth/change-password` | Change current password | Yes |
| `POST` | `/api/auth/forgot-password` | Send password reset email | No |
| `POST` | `/api/auth/reset-password` | Reset password with token | No |
| `GET` | `/api/auth/verify-email?token=xxx` | Verify email address | No |
| `POST` | `/api/auth/resend-verification` | Resend verification email | Yes |

### Request/Response Examples

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Juan Dela Cruz",
  "email": "juan@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "Juan Dela Cruz",
  "email": "juan@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "Juan Dela Cruz",
  "email": "juan@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Google OAuth (`/auth/google`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/google` | Redirects to Google login page |
| `GET` | `/auth/google/callback` | Google redirects here after user approves |

**Flow:**
1. Frontend redirects user to `/auth/google`
2. Backend redirects to Google's OAuth consent screen
3. After approval, Google redirects to `/auth/google/callback`
4. Backend creates/logs in user, then redirects to:
   ```
   https://parknspott.com/auth-success?token=xxx&name=Juan
   ```

---

## Parking Data (`/api/parking`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/parking/availability` | Fetch live carpark data from LTA API | No |
| `GET` | `/api/parking/cached` | Fetch last cached data from MongoDB | No |

#### Get Availability
```http
GET /api/parking/availability
```

**Response:**
```json
{
  "success": true,
  "count": 9,
  "data": [
    {
      "carparkNumber": "OM1",
      "area": "Orchard",
      "development": "ION Orchard",
      "location": { "lat": 1.3040, "lng": 103.8340 },
      "availableLots": 45,
      "lotType": "C",
      "agencyCode": "URA",
      "fetchedAt": "2026-04-24T10:00:00.000Z"
    }
  ],
  "fromCache": false
}
```

**Note:** If the LTA API fails, it automatically falls back to cached data from MongoDB. If MongoDB is also empty, demo data is returned so the map always works.

---

## Notifications (`/api/notifications`)

All notification routes require authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notifications` | Get all notifications |
| `GET` | `/api/notifications/unread-count` | Get number of unread notifications |
| `PATCH` | `/api/notifications/mark-all-read` | Mark all as read |
| `PATCH` | `/api/notifications/:id/read` | Mark one notification as read |
| `DELETE` | `/api/notifications` | Clear all notifications |
| `DELETE` | `/api/notifications/:id` | Delete one notification |

---

## Saved Locations (`/api/auth/locations`)

Requires authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/locations` | Get saved locations |
| `POST` | `/api/auth/locations` | Save a new location |
| `DELETE` | `/api/auth/locations/:id` | Delete a saved location |

---

## Parking History (`/api/auth/history`)

Requires authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/history` | Get parking history |
| `POST` | `/api/auth/history` | Add a parking session |

---

## Health Checks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Returns `"Park n Spot API running"` |
| `GET` | `/health` | Returns `{ "ok": true }` |

Use `/health` for deployment health checks (Railway uses this).

---

## MongoDB Connection

### Where the connection is defined

**File:** `User Backend/config/db.js`

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 
                   process.env.MONGODB_URI || 
                   process.env.DATABASE_URL || 
                   process.env.MONGO_URL;

  const conn = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
```

### Where it gets called

**File:** `User Backend/server.js`

```javascript
const start = async () => {
  await connectDB();        // ← Step 1: Connect to MongoDB
  httpServer.listen(PORT);  // ← Step 2: Start API server
};
```

### Required Environment Variable

Add this to your `User Backend/.env` file:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/parknspot
```

Or for local MongoDB:
```env
MONGO_URI=mongodb://localhost:27017/parknspot
```

### What gets stored in MongoDB

| Collection | Model File | Stores |
|------------|-----------|--------|
| `users` | `models/User.js` | User accounts, passwords (hashed), profiles, Google IDs, saved locations, parking history |
| `parkingcaches` | `models/ParkingCache.js` | Snapshots of carpark availability data |

### How data flows

1. **User signs up** → `User.create()` saves to `users` collection
2. **User logs in** → `User.findOne()` checks email + `matchPassword()` compares bcrypt hash
3. **Parking data fetched** → `ParkingCache.insertMany()` saves LTA API data
4. **API fallback** → If LTA fails, `ParkingCache.find()` returns cached data

---

## Error Codes

| Status | Meaning | Common Cause |
|--------|---------|--------------|
| `200` | Success | Request worked |
| `201` | Created | New user/resource created |
| `400` | Bad Request | Missing fields or invalid data |
| `401` | Unauthorized | Wrong password, missing token, or unverified account |
| `404` | Not Found | User or resource doesn't exist |
| `405` | Method Not Allowed | API request hit frontend instead of backend (proxy issue) |
| `500` | Server Error | Database error or missing env variable |
| `502` | Bad Gateway | Backend is down or unreachable |

---

## Frontend → Backend API Calls

The frontend uses `API_URL` from `src/lib/api.ts`:

| Environment | `API_URL` Value | Calls go to |
|-------------|----------------|-------------|
| Local dev (`npm run dev`) | `''` (empty) | Vite proxy → `localhost:5000` |
| Production (deployed) | `https://park-n-spot-production.up.railway.app` | Direct to Railway backend |

Example frontend call:
```javascript
const res = await fetch(`${API_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```
