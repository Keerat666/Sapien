/**
 * Prompts API Routes
 * @summary CRUD operations for prompts
 * @tags Prompts
 */
const express = require("express");
const router = express.Router();
const promptsController = require("../controllers/promptsController");
const { createPromptValidator, updatePromptValidator, partialUpdateValidator } = require("../validators/promptValidators");
const { upload, handleUploadError } = require("../middlewares/upload");

/**
 * GET /api/prompts
 * @summary Get all prompts with filtering and pagination
 * @tags Prompts
 * @param {number} page.query - Page number (default: 1)
 * @param {number} limit.query - Items per page (default: 10)
 * @param {string} search.query - Search query
 * @param {string} category.query - Filter by category
 * @param {string} tags.query - Filter by tags (comma-separated)
 * @param {string} resultType.query - Filter by result type
 * @param {string} worksBestWith.query - Filter by compatible models
 * @param {boolean} isActive.query - Filter by active status
 * @param {string} sortBy.query - Sort field (default: createdAt)
 * @param {string} sortOrder.query - Sort order: asc/desc (default: desc)
 * @return {object} 200 - Array of prompts with pagination
 * @return {object} 500 - Server error
 */
router.get("/prompts", promptsController.getAllPrompts);

/**
 * GET /api/prompts/search
 * @summary Search prompts
 * @tags Prompts
 * @param {string} q.query.required - Search query
 * @param {number} page.query - Page number (default: 1)
 * @param {number} limit.query - Items per page (default: 10)
 * @return {object} 200 - Array of matching prompts
 * @return {object} 400 - Missing search query
 * @return {object} 500 - Server error
 */
router.get("/prompts/search", promptsController.searchPrompts);

/**
 * GET /api/prompts/popular
 * @summary Get popular prompts
 * @tags Prompts
 * @param {number} limit.query - Number of prompts to return (default: 20)
 * @return {object} 200 - Array of popular prompts
 * @return {object} 500 - Server error
 */
router.get("/prompts/popular", promptsController.getPopularPrompts);

/**
 * GET /api/prompts/categories
 * @summary Get all unique categories
 * @tags Prompts
 * @return {object} 200 - Array of categories
 * @return {object} 500 - Server error
 */
router.get("/prompts/categories", promptsController.getCategories);

/**
 * GET /api/prompts/category/:category
 * @summary Get prompts by category
 * @tags Prompts
 * @param {string} category.path.required - Category name
 * @param {number} limit.query - Number of prompts to return (default: 50)
 * @return {object} 200 - Array of prompts in category
 * @return {object} 500 - Server error
 */
router.get("/prompts/category/:category", promptsController.getPromptsByCategory);

/**
 * GET /api/prompts/tag/:tag
 * @summary Get prompts by tag
 * @tags Prompts
 * @param {string} tag.path.required - Tag name
 * @return {object} 200 - Array of prompts with tag
 * @return {object} 500 - Server error
 */
router.get("/prompts/tag/:tag", promptsController.getPromptsByTag);

/**
 * GET /api/prompts/:id
 * @summary Get a specific prompt by ID
 * @tags Prompts
 * @param {string} id.path.required - Prompt ID
 * @return {object} 200 - Prompt details
 * @return {object} 404 - Prompt not found
 * @return {object} 400 - Invalid prompt ID
 * @return {object} 500 - Server error
 */
router.get("/prompts/:id", promptsController.getPromptById);

/**
 * POST /api/prompts
 * @summary Create a new prompt
 * @tags Prompts
 * @param {object} request.body.required - Prompt data
 * @return {object} 201 - Created prompt
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.post(
  "/prompts",
  upload.single("coverImage"),
  handleUploadError,
  createPromptValidator,
  promptsController.createPrompt
);

/**
 * PUT /api/prompts/:id
 * @summary Update a prompt
 * @tags Prompts
 * @param {string} id.path.required - Prompt ID
 * @param {object} request.body.required - Updated prompt data
 * @return {object} 200 - Updated prompt
 * @return {object} 404 - Prompt not found
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.put(
  "/prompts/:id",
  upload.single("coverImage"),
  handleUploadError,
  updatePromptValidator,
  promptsController.updatePrompt
);

/**
 * PATCH /api/prompts/:id
 * @summary Partial update of a prompt
 * @tags Prompts
 * @param {string} id.path.required - Prompt ID
 * @param {object} request.body.required - Fields to update
 * @return {object} 200 - Updated prompt
 * @return {object} 404 - Prompt not found
 * @return {object} 500 - Server error
 */
router.patch("/prompts/:id", partialUpdateValidator, promptsController.partialUpdate);

/**
 * PATCH /api/prompts/:id/like
 * @summary Increment likes for a prompt
 * @tags Prompts
 * @param {string} id.path.required - Prompt ID
 * @return {object} 200 - Updated likes count
 * @return {object} 404 - Prompt not found
 * @return {object} 500 - Server error
 */
router.patch("/prompts/:id/like", promptsController.likePrompt);

/**
 * PATCH /api/prompts/:id/use
 * @summary Increment uses for a prompt
 * @tags Prompts
 * @param {string} id.path.required - Prompt ID
 * @return {object} 200 - Updated uses count
 * @return {object} 404 - Prompt not found
 * @return {object} 500 - Server error
 */
router.patch("/prompts/:id/use", promptsController.usePrompt);

/**
 * DELETE /api/prompts/:id
 * @summary Delete a prompt (soft delete by default)
 * @tags Prompts
 * @param {string} id.path.required - Prompt ID
 * @param {boolean} permanent.query - Permanent deletion (default: false)
 * @return {object} 200 - Success message
 * @return {object} 404 - Prompt not found
 * @return {object} 400 - Invalid prompt ID
 * @return {object} 500 - Server error
 */
router.delete("/prompts/:id", promptsController.deletePrompt);

module.exports = router;