const usersService = require('../services/usersService');
const { validationResult } = require('express-validator');

class UsersController {
  /**
   * Get all users
   */
  async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 10, sort = "createdAt" } = req.query;
      
      const result = await usersService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        sort
      });

      res.json({
        success: true,
        data: result.users,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: error.message
      });
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(req, res) {
    try {
      const user = await usersService.getUserById(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: error.message
      });
    }
  }

  /**
   * Create a new user
   */
  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array()
        });
      }

      const user = await usersService.createUser(req.body);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
      });
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map(err => err.message)
        });
      }

      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error.message
      });
    }
  }

  /**
   * Update a user
   */
  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array()
        });
      }

      const user = await usersService.updateUser(req.params.id, req.body);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json({
        success: true,
        message: "User updated successfully",
        data: user
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
        message: "Error updating user",
        error: error.message
      });
    }
  }

  /**
   * Delete a user
   */
  async deleteUser(req, res) {
    try {
      const deleted = await usersService.deleteUser(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json({
        success: true,
        message: "User deleted successfully",
        data: { id: req.params.id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error.message
      });
    }
  }

  /**
   * Search users
   */
  async searchUsers(req, res) {
    try {
      const { q: query, page = 1, limit = 10 } = req.query;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: "Search query is required"
        });
      }

      const result = await usersService.searchUsers(query, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json({
        success: true,
        data: result.users,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error searching users",
        error: error.message
      });
    }
  }
}

module.exports = new UsersController();