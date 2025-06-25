const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const pressKitRoutes = require('./routes/pressKits');
const assetsRoutes = require('./routes/assets');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/press-kits', pressKitRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Digital Press Kit Builder API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
