const express = require('express');
const cors = require('cors');
const path = require('path');
const expressJSDocSwagger = require("express-jsdoc-swagger");

// Import configuration and middleware
const swaggerConfig = require("./docs/swagger-config");
const mongo = require("./middlewares/connection");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

// Import routes
const healthRoutes = require("./routes/health");
const commentsRoutes = require("./routes/comments");
const usersRoutes = require("./routes/users");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8009;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Initialize Swagger
expressJSDocSwagger(app)(swaggerConfig);

// API Routes
app.use("/api", healthRoutes);
app.use("/api", commentsRoutes);
app.use("/api", usersRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'ui/dist')));

// Handle other routes and return the React app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui/dist/index.html'));
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = app;