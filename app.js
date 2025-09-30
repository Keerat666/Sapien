const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = 8009;
require("dotenv").config();

// Import routes
const promptRoutes = require("./routes/promptRoutes");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads/cover-images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/prompts_db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Health check API
app.use("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "Hello from Sapien!",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// API Routes
app.use("/api/prompts", promptRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "ui/dist")));

// Handle other routes and return the React app
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "ui/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = app;
