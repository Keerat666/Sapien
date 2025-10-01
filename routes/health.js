/**
 * GET /api/health
 * @summary Health check endpoint
 * @tags Health
 * @return {object} 200 - Health status
 */
const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date(), message : "Hello from Sapien!" });
});

module.exports = router;
