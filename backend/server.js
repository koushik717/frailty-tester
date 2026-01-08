const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Session configuration
// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: true, // Changed to true for debugging
  saveUninitialized: true, // Changed to true for debugging
  cookie: {
    secure: false, // false for localhost
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Debug Middleware for Sessions
app.use((req, res, next) => {
  console.log(`[Session Debug] ${req.method} ${req.url} - Session ID: ${req.sessionID}`);
  console.log(`[Session Debug] User:`, req.session.user);
  next();
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Register routes BEFORE static middleware
const resultRoutes = require('./routes/resultRoutes');
const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleAuth');
const facebookAuthRoutes = require('./routes/facebookAuth');
const userRoutes = require('./routes/userRoutes');

app.use('/api/frailty-tests', resultRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/auth', facebookAuthRoutes);

// --- FRAILTY TEST API ENDPOINTS ---

// 🧠 Perceived Stress Scale (PSS-10)
app.post('/api/frailty-tests/pss', (req, res) => {
  console.log('✅ Received PSS test results:', req.body);
  res.json({ success: true, message: 'PSS results received successfully!' });
});

// 💙 General Health Inventory (SF-36)
app.post('/api/frailty-tests/sf36', (req, res) => {
  console.log('✅ Received SF-36 test results:', req.body);
  res.json({ success: true, message: 'SF-36 results received successfully!' });
});

// ⚡ Reaction Time Test
app.post('/api/frailty-tests/reaction-time', (req, res) => {
  console.log('✅ Received Reaction Time results:', req.body);
  res.json({ success: true, message: 'Reaction Time results saved successfully!' });
});

// 🧩 Memory Test
app.post('/api/memory-test/results', (req, res) => {
  console.log('✅ Received Memory Test results:', req.body);
  res.json({ success: true, message: 'Memory Test results saved successfully!' });
});

// --- Serve static frontend (optional, for production builds) ---
app.use(express.static(path.join(__dirname, '../dist')));

// --- Default Route (for React frontend) ---
app.get('*', (req, res) => {
  const indexPath = path.resolve(__dirname, '../dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('❌ Could not find frontend index.html:', indexPath);
      res.status(404).send('Frontend build not found');
    }
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: http://localhost:${PORT}`);
});
