const express = require('express');
var cors = require('cors')
const app = express();
const path = require('path');
const PORT = 8009;
const expressJSDocSwagger = require("express-jsdoc-swagger");
const swaggerConfig = require("./docs/swagger-config");
const healthRoutes = require("./routes/health");

require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Initialize Swagger
expressJSDocSwagger(app)(swaggerConfig);

app.use("/api", healthRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'ui/dist')));

// Handle other routes and return the React app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = app;