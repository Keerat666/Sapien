const User = require("../models/users");
const Prompt = require("../models/Prompt");
const Comment = require("../models/comments");

class HomeController {
  /**
   * Get homepage statistics
   */
  async getHomeStats(req, res) {
    try {
      // Get counts for all statistics in parallel for better performance
      const [creatorsCount, promptsCount, commentsCount] = await Promise.all([
        User.countDocuments(),
        Prompt.countDocuments({ isActive: true }),
        Comment.countDocuments()
      ]);

      res.json({
        success: true,
        data: {
          creators: creatorsCount,
          prompts: promptsCount,
          comments: commentsCount
        },
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error fetching home statistics:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch homepage statistics",
        error: error.message
      });
    }
  }
}

module.exports = new HomeController();