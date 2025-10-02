const commentsService = require('../services/commentsService');
const { validationResult } = require('express-validator');

class CommentsController {
  /**
   * Get all comments for a specific prompt
   */
  async getCommentsByPrompt(req, res) {
    try {
      const { promptId } = req.params;
      const { page = 1, limit = 10, sort = "createdAt" } = req.query;
      
      const result = await commentsService.getCommentsByPrompt(promptId, {
        page: parseInt(page),
        limit: parseInt(limit),
        sort
      });

      res.json({
        success: true,
        data: result.comments,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching comments",
        error: error.message
      });
    }
  }

  /**
   * Get all comments by a specific user
   */
  async getCommentsByUser(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      
      const result = await commentsService.getCommentsByUser(userId, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json({
        success: true,
        data: result.comments,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching user comments",
        error: error.message
      });
    }
  }

  /**
   * Get a specific comment by ID
   */
  async getCommentById(req, res) {
    try {
      const comment = await commentsService.getCommentById(req.params.id);

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found"
        });
      }

      res.json({
        success: true,
        data: comment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching comment",
        error: error.message
      });
    }
  }

  /**
   * Create a new comment
   */
  async createComment(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array()
        });
      }

      const { user, prompt, content } = req.body;
      const comment = await commentsService.createComment({ user, prompt, content });

      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data: comment
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map(err => err.message)
        });
      }

      res.status(500).json({
        success: false,
        message: "Error creating comment",
        error: error.message
      });
    }
  }

  /**
   * Update a comment
   */
  async updateComment(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array()
        });
      }

      const { content } = req.body;
      const comment = await commentsService.updateComment(req.params.id, { content });

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found"
        });
      }

      res.json({
        success: true,
        message: "Comment updated successfully",
        data: comment
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map(err => err.message)
        });
      }

      res.status(500).json({
        success: false,
        message: "Error updating comment",
        error: error.message
      });
    }
  }

  /**
   * Delete a comment
   */
  async deleteComment(req, res) {
    try {
      const deleted = await commentsService.deleteComment(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Comment not found"
        });
      }

      res.json({
        success: true,
        message: "Comment deleted successfully",
        data: { id: req.params.id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting comment",
        error: error.message
      });
    }
  }
}

module.exports = new CommentsController();