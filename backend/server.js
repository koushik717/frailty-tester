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
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Register routes BEFORE static middleware
const resultRoutes = require('./routes/resultRoutes');
const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleAuth');

app.use('/api/frailty-tests', resultRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', googleAuthRoutes);

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
