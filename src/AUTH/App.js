const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const auth = require("./Auth");

const app = express();

console.log("Server starting...");

// Load environment variables dynamically
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

console.log(`Using environment file: ${envFile}`);

// Validate MongoDB URI
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is undefined. Check your .env file.");
  process.exit(1);
}

console.log("MongoDB URI validated");

// Configure CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_BASE_URL
      : "http://localhost:3000", // Update for your dev frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // For cookies or Authorization headers
};
app.use(cors(corsOptions));

console.log("CORS configured");

// Middleware
app.use(express.json()); // Parse JSON
app.use("/api", auth); // Route to authentication

console.log("Middleware configured");

// MongoDB Connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "WATCHESSTORE",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Test Route
app.get("/api/test", (req, res) => {
  console.log("Test route called");
  res.json({ message: "CORS is configured correctly!" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

console.log("Error handling middleware configured");

// Start Server
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Server environment: ${process.env.NODE_ENV}`);
  console.log(`Server URL: http://localhost:${port}`);
});