const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/mainRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '../dist')));

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});