const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

// Import your routes here
const authRoutes = require("./routes/authRoutes");      // Changed from Auth to authRoutes
const watchRoutes = require("./routes/watchRoutes");    // Changed from Watches to watchRoutes
const cartRoutes = require("./routes/cartRoutes");      // Changed from Cart to cartRoutes
const addressRoutes = require("./routes/addressRoutes"); // Changed from Address to addressRoutes

const app = express();

// Ensure NODE_ENV is set
if (!process.env.NODE_ENV) {
  console.error("NODE_ENV is not set. Please specify 'development' or 'production'.");
  process.exit(1);
}

// Select the correct environment file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
const envPath = path.join(__dirname, '../', envFile);
dotenv.config({ path: envPath });

console.log(`Using environment file: ${envFile}`);
console.log(`API Base URL: ${process.env.REACT_APP_API_BASE_URL}`);

// MongoDB URI
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is undefined. Check your .env file.");
  process.exit(1);
}

// Open-Origin CORS Configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // Disable credentials for open-origin policy
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight requests for all routes

// Middleware to log requests
app.use((req, res, next) => {
  console.log("Incoming Request:", {
    method: req.method,
    path: req.path,
    origin: req.headers.origin,
  });
  next();
});

// Enable JSON parsing
app.use(express.json());
app.use('/api', authRoutes);
// MongoDB connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "WATCHESSTORE",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Use your routes here
app.use('/api/auth', authRoutes);        // Auth routes
app.use('/api/watches', watchRoutes); // Watch routes
app.use('/api/cart', cartRoutes);    // Cart routes
app.use('/api/address', addressRoutes); // Address routes

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is configured correctly!" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;