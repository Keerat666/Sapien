const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Import database connection
const connectDB = require("./middlewares/connection");

// Import routes
const promptRoutes = require("./routes/promptRoutes");
const healthRoutes = require("./routes/health");
const commentsRoutes = require("./routes/comments");
const authRoutes = require('./routes/auth');

const expressJSDocSwagger = require("express-jsdoc-swagger");
const swaggerConfig = require("./docs/swagger-config");

const app = express();
const PORT = 8009;

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads/cover-images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize Swagger
expressJSDocSwagger(app)(swaggerConfig);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check API (merged: custom + route version)
app.use("/api/health", (req, res, next) => {
  if (req.method === "GET") {
    return res.json({
      status: "healthy",
      message: "Hello from Sapien!",
      timestamp: new Date().toISOString(),
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
  }
  next();
});

// API Routes
app.use("/api", healthRoutes);
app.use("/api", commentsRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api",authRoutes);

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

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;