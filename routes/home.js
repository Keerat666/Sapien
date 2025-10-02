/**
 * GET /api/home
 * @summary Get homepage statistics
 * @tags Home
 * @return {object} 200 - Homepage statistics including creators, prompts, and comments count
 * @return {object} 500 - Server error
 */
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/home", homeController.getHomeStats);

module.exports = router;