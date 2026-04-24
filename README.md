# Park 'n Spot

A smart parking web application that helps users find real-time parking availability across Singapore. Built with React, Node.js, Express, and MongoDB.

![Park 'n Spot](public/parking.jpg)

## Features

- **Real-time Parking Map** — Interactive Leaflet map showing live carpark availability
- **Smart Search** — Find parking near Orchard, Marina Bay, and Harbourfront
- **User Authentication** — Email/password login and Google OAuth
- **Navigation** — Get directions to your selected carpark
- **Parking History** — Track your past parking sessions
- **Reports** — Submit feedback or issues about parking facilities
- **Responsive Design** — Works on mobile, tablet, and desktop

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router DOM
- Leaflet + React-Leaflet (maps)
- Framer Motion (animations)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Passport.js (Google OAuth)
- Nodemailer (emails)
- Socket.IO (real-time notifications)

### APIs
- LTA DataMall (carpark availability data)
- OSRM (routing/navigation)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Gmail account (for email features)

### 1. Clone the repository

```bash
git clone https://github.com/ELECTIVE12/PARK-N-SPOT.git
cd PARK-N-SPOT
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd "User Backend"
npm install
cd ..
```

### 4. Environment Variables

Create a `.env` file in the root for frontend:
```env
# Optional — forces direct API calls instead of proxy
VITE_FORCE_DIRECT_API=true
```

Create a `.env` file in `User Backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
LTA_API_KEY=your_lta_datamall_api_key
```

### 5. Run the development servers

**Backend:**
```bash
cd "User Backend"
npm start
```
Server runs at `http://localhost:5000`

**Frontend:**
```bash
npm run dev
```
App runs at `http://localhost:3000`

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `USER_BACKEND_URL=https://your-backend-url.railway.app`

### Backend (Railway)
1. Connect your GitHub repo to Railway
2. Set root directory: `User Backend`
3. Add all environment variables from the `.env` example
4. Deploy

### Important Environment Variables

| Variable | Description |
|----------|-------------|
| `USER_BACKEND_URL` | Your Railway backend URL (for Vercel proxy) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `CLIENT_URL` | Your frontend domain |
| `LTA_API_KEY` | LTA DataMall API key |

## Project Structure

```
PARK-N-SPOT/
├── src/                          # React frontend
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page components
│   │   ├── user/                 # User pages (Home, Explore, Login, etc.)
│   │   └── admin/                # Admin dashboard pages
│   ├── lib/                      # Utilities and API config
│   ├── hooks/                    # Custom React hooks
│   └── App.tsx                   # Main app component
├── User Backend/                 # Node.js backend
│   ├── routes/                   # API routes (auth, parking, notifications)
│   ├── models/                   # Mongoose models
│   ├── middleware/               # Auth middleware
│   ├── config/                   # Passport, CORS, DB config
│   └── server.js                 # Entry point
├── api/                          # Vercel serverless functions
├── public/                       # Static assets
└── dist/                         # Production build
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login with email/password |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/me` | Update user profile |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/auth/google` | Google OAuth login |
| GET | `/auth/google/callback` | Google OAuth callback |

### Parking
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parking/availability` | Get live carpark data |
| GET | `/api/parking/cached` | Get cached carpark data |

## Team

- **Kylle** — Backend & API Integration
- **Lil-Faith** — Frontend UI/UX
- **Venus** — Admin Dashboard
- **Katelyn** — Components & Styling
- **Ervin** — Features & Testing

## License

This project was built for educational purposes (ELECTIVE 1 & 2, 2026).

---

**Live Demo:** [https://parknspott.com](https://parknspott.com)
