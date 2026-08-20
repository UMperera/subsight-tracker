const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse incoming JSON data

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic API Route to test the server
app.get('/', (req, res) => {
  res.send('SubSight API is active');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});