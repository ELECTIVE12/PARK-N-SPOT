import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== MongoDB CONNECTION =====
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env file');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// ===== SCHEMAS & MODELS =====
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from './utils/auth.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  lastActivity: String,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const facilitySchema = new mongoose.Schema({
  name: String,
  location: String,
  totalSlots: Number,
  availableSlots: Number,
  pricePerHour: Number,
  status: { type: String, enum: ['OPEN', 'CLOSED', 'FULL'], default: 'OPEN' }
});

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  submittedBy: String,
  userId: mongoose.Schema.Types.ObjectId,
  location: String,
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED'], default: 'PENDING' },
  date: String,
  createdAt: { type: Date, default: Date.now }
});

const sessionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  facilityId: mongoose.Schema.Types.ObjectId,
  facilityName: String,
  startTime: String,
  endTime: String,
  duration: String,
  price: String,
  status: { type: String, enum: ['ACTIVE', 'COMPLETED'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now }
});

const reportSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  userName: String,
  location: String,
  status: { type: String, enum: ['available', 'full', 'incorrect'] },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Facility = mongoose.model('Facility', facilitySchema);
const Complaint = mongoose.model('Complaint', complaintSchema);
const Session = mongoose.model('Session', sessionSchema);
const Report = mongoose.model('Report', reportSchema);

// Removed global currentUser - using JWT tokens now


// ===== HELPER FUNCTIONS =====
const getStats = async () => {
  try {
    const facilities = await Facility.find();
    const sessions = await Session.find();
    const complaints = await Complaint.find();

    const totalSlots = facilities.reduce((sum: number, f: any) => sum + f.totalSlots, 0);
    const availableSlots = facilities.reduce((sum: number, f: any) => sum + f.availableSlots, 0);
    const utilization = totalSlots > 0 ? Math.round(((totalSlots - availableSlots) / totalSlots) * 100) : 0;
    const activeSessions = sessions.filter((s: any) => s.status === 'ACTIVE').length;
    const pendingComplaints = complaints.filter((c: any) => c.status === 'PENDING').length;

    return {
      utilization,
      availableSlots,
      activeSessions,
      dailyIncidents: pendingComplaints,
      avgResponse: '1.4h',
      satisfiedRate: '94%'
    };
  } catch (error) {
    console.error('Error calculating stats:', error);
    return {
      utilization: 0,
      availableSlots: 0,
      activeSessions: 0,
      dailyIncidents: 0,
      avgResponse: '0h',
      satisfiedRate: '0%'
    };
  }
};

// ===== USER ROUTES =====
app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    await User.findByIdAndUpdate(user._id, { lastActivity: new Date().toISOString() });
    
    const token = generateToken({ userId: user._id, email: user.email });
    const { password: _, ...safeUser } = user.toObject();
    
    res.json({ 
      success: true, 
      token,
      user: safeUser 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});


app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      status: 'ACTIVE',
      lastActivity: new Date().toISOString()
    });
    await newUser.save();
    
    const token = generateToken({ userId: newUser._id, email: newUser.email });
    const { password: _, ...safeUser } = newUser.toObject();
    
    res.json({ 
      success: true, 
      token,
      user: safeUser 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});


app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.get('/api/current-user', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});


// ===== FACILITY ROUTES =====
app.get('/api/facilities', async (req: Request, res: Response) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch facilities' });
  }
});

app.get('/api/facilities/:id', async (req: Request, res: Response) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (facility) {
      res.json(facility);
    } else {
      res.status(404).json({ error: 'Facility not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch facility' });
  }
});

app.put('/api/facilities/:id', async (req: Request, res: Response) => {
  try {
    const updatedFacility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedFacility) {
      res.json(updatedFacility);
    } else {
      res.status(404).json({ error: 'Facility not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update facility' });
  }
});

// ===== COMPLAINT ROUTES =====
app.get('/api/complaints', async (req: Request, res: Response) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

app.get('/api/complaints/:id', async (req: Request, res: Response) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
      res.json(complaint);
    } else {
      res.status(404).json({ error: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaint' });
  }
});

app.post('/api/complaints', async (req: Request, res: Response) => {
  try {
    const { title, description, submittedBy, userId, location, status = 'PENDING' } = req.body;
    const newComplaint = new Complaint({
      title,
      description,
      submittedBy,
      userId,
      location,
      status,
      date: new Date().toLocaleDateString('en-CA')
    });
    await newComplaint.save();
    res.json(newComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create complaint' });
  }
});

app.put('/api/complaints/:id', async (req: Request, res: Response) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedComplaint) {
      res.json(updatedComplaint);
    } else {
      res.status(404).json({ error: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update complaint' });
  }
});

// ===== PARKING SESSION ROUTES =====
app.get('/api/sessions', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (userId) {
      const sessions = await Session.find({ userId });
      res.json(sessions);
    } else {
      const sessions = await Session.find();
      res.json(sessions);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

app.get('/api/sessions/:id', async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.params.id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

app.post('/api/sessions', async (req: Request, res: Response) => {
  try {
    const { userId, facilityId, facilityName, startTime, endTime, duration, price, status = 'ACTIVE' } = req.body;
    const newSession = new Session({
      userId,
      facilityId,
      facilityName,
      startTime,
      endTime,
      duration,
      price,
      status
    });
    await newSession.save();
    res.json(newSession);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// ===== REPORT ROUTES =====
app.get('/api/reports', async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

app.post('/api/reports', async (req: Request, res: Response) => {
  try {
    const { userId, userName, location, status, notes } = req.body;
    const newReport = new Report({
      userId,
      userName,
      location,
      status,
      notes
    });
    await newReport.save();
    res.json(newReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create report' });
  }
});

// ===== STATS ROUTE =====
app.get('/api/stats', (req: Request, res: Response) => {
  res.json(getStats());
});

// ===== ADMIN ROUTES =====
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Simple admin check - in production this would validate real credentials
  res.json({ success: true, message: 'Admin logged in' });
});

app.get('/api/admin/dashboard', async (req: Request, res: Response) => {
  try {
    const stats = await getStats();
    const recentComplaints = await Complaint.find().sort({ createdAt: -1 }).limit(5);
    const recentSessions = await Session.find().sort({ createdAt: -1 }).limit(5);
    const userCount = await User.countDocuments();

    res.json({
      stats,
      recentComplaints,
      recentSessions,
      userCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// ===== ERROR HANDLING =====
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚗 Park 'n Spot API running at http://localhost:${PORT}`);
  console.log(`📍 Available routes:`);
  console.log(`   POST   /api/login`);
  console.log(`   POST   /api/register`);
  console.log(`   GET    /api/users`);
  console.log(`   GET    /api/facilities`);
  console.log(`   GET    /api/complaints`);
  console.log(`   POST   /api/complaints`);
  console.log(`   GET    /api/sessions`);
  console.log(`   POST   /api/sessions`);
  console.log(`   GET    /api/reports`);
  console.log(`   POST   /api/reports`);
  console.log(`   GET    /api/stats`);
  console.log(`   POST   /api/admin/login`);
  console.log(`   GET    /api/admin/dashboard`);
});
