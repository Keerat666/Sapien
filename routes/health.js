/**
 * GET /api/health
 * @summary Health check endpoint
 * @tags Health
 * @return {object} 200 - Health status
 */
const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

router.get("/health", healthController.getHealth);

module.exports = router;
