const express = require("express");
const cors = require("cors");
const path = require("path");
const expressJSDocSwagger = require("express-jsdoc-swagger");

// Import configuration and middleware
const swaggerConfig = require("./docs/swagger-config");
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

// Import routes
const healthRoutes = require("./routes/health");
const homeRoutes = require("./routes/home");
const commentsRoutes = require("./routes/comments");
const promptRoutes = require("./routes/prompts");
const authRoutes = require('./routes/auth'); 
const usersRoutes = require("./routes/users");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8009;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

// Initialize Swagger
expressJSDocSwagger(app)(swaggerConfig);

// API Routes
app.use("/api", healthRoutes);
app.use("/api", homeRoutes);
app.use("/api", commentsRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api", authRoutes); 
app.use("/api", usersRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "ui/dist")));

// Handle other routes and return the React app
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "ui/dist/index.html"));
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server only after DB connection
const startServer = async () => {
  try {
   await connectDB(); // ✅ initialize DB connection
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
