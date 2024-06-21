const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./Auth'); // Assuming this is where your router is defined

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',  // Allow requests from all origins
  methods: ['GET', 'POST'],         // Allow these HTTP methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/TAHAKHAN';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit the process if the database connection fails
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Route configuration
app.use('/api', auth); // Assuming your routes are prefixed with /api

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start server
const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
