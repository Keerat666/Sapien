/**
 * Comments API Routes
 * @summary CRUD operations for comments on prompts
 * @tags Comments
 */
const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");

/**
 * GET /api/comments/prompt/:promptId
 * @summary Get all comments for a specific prompt
 * @tags Comments
 * @param {string} promptId.path.required - Prompt ID
 * @return {object} 200 - Array of comments
 * @return {object} 404 - Prompt not found
 * @return {object} 500 - Server error
 */
router.get("/comments/prompt/:promptId", async (req, res) => {
  try {
    const { promptId } = req.params;
    const { page = 1, limit = 10, sort = "createdAt" } = req.query;
    
    const comments = await Comment.find({ prompt: promptId })
      .populate("user", "name username avatar")
      .sort({ [sort]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Comment.countDocuments({ prompt: promptId });

    res.json({
      success: true,
      data: comments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching comments",
      error: error.message
    });
  }
});

/**
 * GET /api/comments/user/:userId
 * @summary Get all comments by a specific user
 * @tags Comments
 * @param {string} userId.path.required - User ID
 * @return {object} 200 - Array of user comments
 * @return {object} 500 - Server error
 */
router.get("/comments/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const comments = await Comment.find({ user: userId })
      .populate("prompt", "title")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Comment.countDocuments({ user: userId });

    res.json({
      success: true,
      data: comments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user comments",
      error: error.message
    });
  }
});
/**
 
* GET /api/comments/:id
 * @summary Get a specific comment by ID
 * @tags Comments
 * @param {string} id.path.required - Comment ID
 * @return {object} 200 - Comment details
 * @return {object} 404 - Comment not found
 * @return {object} 500 - Server error
 */
router.get("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("user", "name username avatar")
      .populate("prompt", "title");

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
});

/**
 * POST /api/comments
 * @summary Create a new comment
 * @tags Comments
 * @param {object} request.body.required - Comment data
 * @return {object} 201 - Created comment
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.post("/comments", async (req, res) => {
  try {
    const { user, prompt, content } = req.body;

    // Basic validation
    if (!user || !prompt || !content) {
      return res.status(400).json({
        success: false,
        message: "User, prompt, and content are required fields"
      });
    }

    const newComment = new Comment({
      user,
      prompt,
      content: content.trim()
    });

    const savedComment = await newComment.save();
    
    // Populate the saved comment for response
    const populatedComment = await Comment.findById(savedComment._id)
      .populate("user", "name username avatar")
      .populate("prompt", "title");

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: populatedComment
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
});

/**
 * PUT /api/comments/:id
 * @summary Update a comment
 * @tags Comments
 * @param {string} id.path.required - Comment ID
 * @param {object} request.body.required - Updated comment data
 * @return {object} 200 - Updated comment
 * @return {object} 404 - Comment not found
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.put("/comments/:id", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Content is required"
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { 
        content: content.trim(),
        isEdited: true,
        editedAt: new Date()
      },
      { new: true, runValidators: true }
    )
    .populate("user", "name username avatar")
    .populate("prompt", "title");

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    res.json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment
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
});

/**
 * DELETE /api/comments/:id
 * @summary Delete a comment
 * @tags Comments
 * @param {string} id.path.required - Comment ID
 * @return {object} 200 - Success message
 * @return {object} 404 - Comment not found
 * @return {object} 500 - Server error
 */
router.delete("/comments/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
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
});

module.exports = router;