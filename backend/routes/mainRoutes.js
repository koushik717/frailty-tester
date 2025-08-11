const express = require('express');
const path = require('path');
const exerciseRoutes = require('./exerciseRoutes');
const resultRoutes = require('./resultRoutes');

const router = express.Router();

// Serve static files
router.use(express.static(path.join(__dirname, '../../dist')));

// Mount routes
router.use('/', exerciseRoutes);
router.use('/', resultRoutes);

// Serve React app for all other routes
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;