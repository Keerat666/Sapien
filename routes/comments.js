/**
 * Comments API Routes
 * @summary CRUD operations for comments on prompts
 * @tags Comments
 */
const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const { createCommentValidator, updateCommentValidator } = require("../validators/commentValidators");

/**
 * GET /api/comments/prompt/:promptId
 * @summary Get all comments for a specific prompt
 * @tags Comments
 * @param {string} promptId.path.required - Prompt ID
 * @return {object} 200 - Array of comments
 * @return {object} 404 - Prompt not found
 * @return {object} 500 - Server error
 */
router.get("/comments/prompt/:promptId", commentsController.getCommentsByPrompt);

/**
 * GET /api/comments/user/:userId
 * @summary Get all comments by a specific user
 * @tags Comments
 * @param {string} userId.path.required - User ID
 * @return {object} 200 - Array of user comments
 * @return {object} 500 - Server error
 */
router.get("/comments/user/:userId", commentsController.getCommentsByUser);

/**
 * GET /api/comments/:id
 * @summary Get a specific comment by ID
 * @tags Comments
 * @param {string} id.path.required - Comment ID
 * @return {object} 200 - Comment details
 * @return {object} 404 - Comment not found
 * @return {object} 500 - Server error
 */
router.get("/comments/:id", commentsController.getCommentById);

/**
 * POST /api/comments
 * @summary Create a new comment
 * @tags Comments
 * @param {object} request.body.required - Comment data
 * @return {object} 201 - Created comment
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.post("/comments", createCommentValidator, commentsController.createComment);

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
router.put("/comments/:id", updateCommentValidator, commentsController.updateComment);

/**
 * DELETE /api/comments/:id
 * @summary Delete a comment
 * @tags Comments
 * @param {string} id.path.required - Comment ID
 * @return {object} 200 - Success message
 * @return {object} 404 - Comment not found
 * @return {object} 500 - Server error
 */
router.delete("/comments/:id", commentsController.deleteComment);

module.exports = router;