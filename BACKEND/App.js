const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan"); // Import morgan for logging

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
  origin: ' /https:\/\/.*\.vercel\.app$/, ', // Adjust based on your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin',
    'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods'
  ],
  credentials: true,
  maxAge: 86400
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Add additional headers middleware (for pre-flight checks)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://watches-web-weld.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers'
  );

  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Morgan request logger middleware
app.use(morgan('combined')); // Logs requests in 'combined' format for production or 'dev' for development

// Body parser middleware for JSON data
app.use(express.json());

// Request Logger - Custom logging with timestamp
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
    setTimeout(connectToDatabase, 5000); // Retry connection every 5 seconds
  }
};

connectToDatabase();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/watches", watchRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);


// Add a route for the root path to display a simple message
app.get("/", (req, res) => {
  res.send("Hello, server is alive");
});


// Health check route to ensure the server is running
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Error handler middleware for unexpected errors
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start the server
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

module.exports = app;
