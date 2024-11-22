const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const auth = require('./Auth');
const app = express();
const path = require('path');

// Ensure NODE_ENV is set
if (!process.env.NODE_ENV) {
  console.error("NODE_ENV is not set. Please specify either 'development' or 'production'.");
  process.exit(1);
}

// Select the correct environment file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// Validate that envFile is a valid string
if (typeof envFile !== 'string' || !envFile) {
  console.error("Environment file name is invalid. Expected a string, but received:", envFile);
  process.exit(1);
}

const envPath = path.join(__dirname, '../../', envFile);

// Ensure the envPath is a valid string
if (typeof envPath !== 'string' || !envPath) {
  console.error("Environment path is invalid. Check the construction of envPath.");
  process.exit(1);
}

// Load environment variables
dotenv.config({ path: envPath });

console.log(`Using environment file: ${envFile}`);

// Get environment variables
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MONGO_URI is undefined. Check your .env file.");
  process.exit(1);
}

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BASE_URL
    : "http://localhost:3000", // Change this to your frontend development URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // Enable credentials for cookies or Authorization headers
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Enable parsing JSON requests
app.use('/api', auth);

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

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// A simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is configured correctly!" });
});

// Start the server
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
