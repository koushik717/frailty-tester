const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// ✅ Register routes BEFORE static middleware
const resultRoutes = require('./routes/resultRoutes');
app.use('/api/frailty-tests', resultRoutes);

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
