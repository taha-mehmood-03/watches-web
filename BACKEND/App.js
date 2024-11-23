const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/authRoutes");
const watchRoutes = require("./routes/watchRoutes");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");

const app = express();

// Load environment variables based on NODE_ENV
dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
  ),
});

// MongoDB URI
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is undefined. Check your environment variables.");
  process.exit(1);
}

// CORS Configuration

const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS.split(','), // Make sure this reads from the environment
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// MongoDB connection with retry mechanism
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "WATCHESSTORE",
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    setTimeout(connectToDatabase, 5000); // Retry after 5 seconds
  }
};

connectToDatabase(); // Initial call to connect to the database

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/watches", watchRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);

// Health check route (Enhanced version with more info)
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Error handler (Centralized and async-aware)
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

module.exports = app;
