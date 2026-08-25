const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const subscriptionRoutes = require('./routes/subscriptionRoutes');

app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/auth', require('./routes/authRoutes'));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Test route
app.get('/', (req, res) => {
  res.send('SubSight API is active');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});