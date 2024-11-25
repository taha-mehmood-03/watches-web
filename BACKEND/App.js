const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

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
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // List of allowed domains
    const allowedDomains = [
      'https://watches-web-weld.vercel.app',
      'http://watches-web-weld.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
    ];

    // Allow Vercel Preview URLs
    const isVercelPreview = origin.match(/https:\/\/watches-.*?-.*?\.vercel\.app$/);
    
    if (allowedDomains.includes(origin) || isVercelPreview) {
      callback(null, true);
    } else {
      console.log(`Blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With', 
    'Accept', 
    'Origin',
    'Access-Control-Allow-Headers', 
    'Access-Control-Allow-Origin', 
    'Access-Control-Allow-Methods'
  ],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));


app.use('/images', express.static(path.join(__dirname, 'public/images')));
// Additional headers middleware for better CORS handling
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Vary', 'Origin');
  }
  next();
});

// Morgan request logger middleware with custom format
const morganFormat = process.env.NODE_ENV === 'production'
  ? 'combined'
  : ':method :url :status :response-time ms - :res[content-length] - :remote-addr';

app.use(morgan(morganFormat));

// Body parser middleware with limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection with enhanced retry mechanism
const connectToDatabase = async (retries = 5) => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "WATCHESSTORE",
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 10000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    if (retries > 0) {
      console.log(`Retrying connection... (${retries} attempts remaining)`);
      setTimeout(() => connectToDatabase(retries - 1), 5000);
    } else {
      console.error("Failed to connect to MongoDB after multiple attempts");
      process.exit(1);
    }
  }
};

connectToDatabase();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/watches", watchRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);

// Root path
app.get("/", (req, res) => {
  res.send("Server is running normally");
});

// Enhanced health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: {
      status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      host: mongoose.connection.host,
      name: mongoose.connection.name
    },
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// Error handler middleware with detailed logging
app.use((err, req, res, next) => {
  console.error("Error occurred:", {
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    origin: req.headers.origin
  });

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS Error',
      message: `Origin '${req.headers.origin}' is not allowed`
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Graceful shutdown handler
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal. Starting graceful shutdown...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

// Start the server
const port = process.env.PORT || 4003;
const server = app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  console.log(`CORS enabled for Vercel deployments and allowed domains`);
});

module.exports = app;