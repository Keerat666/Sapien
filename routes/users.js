/**
 * Users API Routes
 * @summary CRUD operations for users
 * @tags Users
 */
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { createUserValidator, updateUserValidator } = require("../validators/userValidators");

/**
 * GET /api/users
 * @summary Get all users with pagination
 * @tags Users
 * @param {number} page.query - Page number (default: 1)
 * @param {number} limit.query - Items per page (default: 10)
 * @param {string} sort.query - Sort field (default: createdAt)
 * @return {object} 200 - Array of users
 * @return {object} 500 - Server error
 */
router.get("/users", usersController.getAllUsers);

/**
 * GET /api/users/search
 * @summary Search users by name or username
 * @tags Users
 * @param {string} q.query.required - Search query
 * @param {number} page.query - Page number (default: 1)
 * @param {number} limit.query - Items per page (default: 10)
 * @return {object} 200 - Array of matching users
 * @return {object} 400 - Missing search query
 * @return {object} 500 - Server error
 */
router.get("/users/search", usersController.searchUsers);

/**
 * GET /api/users/:id
 * @summary Get a specific user by ID
 * @tags Users
 * @param {string} id.path.required - User ID
 * @return {object} 200 - User details
 * @return {object} 404 - User not found
 * @return {object} 500 - Server error
 */
router.get("/users/:id", usersController.getUserById);

/**
 * POST /api/users
 * @summary Create a new user
 * @tags Users
 * @param {object} request.body.required - User data
 * @return {object} 201 - Created user
 * @return {object} 400 - Validation error
 * @return {object} 409 - User already exists
 * @return {object} 500 - Server error
 */
router.post("/users", createUserValidator, usersController.createUser);

/**
 * PUT /api/users/:id
 * @summary Update a user
 * @tags Users
 * @param {string} id.path.required - User ID
 * @param {object} request.body.required - Updated user data
 * @return {object} 200 - Updated user
 * @return {object} 404 - User not found
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.put("/users/:id", updateUserValidator, usersController.updateUser);

/**
 * DELETE /api/users/:id
 * @summary Delete a user
 * @tags Users
 * @param {string} id.path.required - User ID
 * @return {object} 200 - Success message
 * @return {object} 404 - User not found
 * @return {object} 500 - Server error
 */
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;