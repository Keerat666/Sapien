const promptsService = require('../services/promptsService');
const { validationResult } = require('express-validator');

class PromptsController {
  /**
   * Get all prompts with filtering and pagination
   */
  async getAllPrompts(req, res) {
    try {
      const result = await promptsService.getAllPrompts(req.query);

      res.json({
        success: true,
        data: result.prompts,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch prompts",
        details: error.message
      });
    }
  }

  /**
   * Get prompt by ID
   */
  async getPromptById(req, res) {
    try {
      const prompt = await promptsService.getPromptById(req.params.id);

      if (!prompt) {
        return res.status(404).json({
          success: false,
          error: "Prompt not found"
        });
      }

      res.json({
        success: true,
        data: prompt
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          error: "Invalid prompt ID"
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to fetch prompt",
        details: error.message
      });
    }
  }

  /**
   * Create a new prompt
   */
  async createPrompt(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          details: errors.array()
        });
      }

      const promptData = {
        ...req.body,
        coverImage: req.file ? `/uploads/cover-images/${req.file.filename}` : null
      };

      const prompt = await promptsService.createPrompt(promptData);

      res.status(201).json({
        success: true,
        message: "Prompt created successfully",
        data: prompt
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          details: Object.values(error.errors).map(e => e.message)
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to create prompt",
        details: error.message
      });
    }
  }

  /**
   * Update a prompt
   */
  async updatePrompt(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          details: errors.array()
        });
      }

      const updateData = {
        ...req.body,
        coverImage: req.file ? `/uploads/cover-images/${req.file.filename}` : undefined
      };

      const prompt = await promptsService.updatePrompt(req.params.id, updateData);

      if (!prompt) {
        return res.status(404).json({
          success: false,
          error: "Prompt not found"
        });
      }

      res.json({
        success: true,
        message: "Prompt updated successfully",
        data: prompt
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          details: Object.values(error.errors).map(e => e.message)
        });
      }
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          error: "Invalid prompt ID"
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to update prompt",
        details: error.message
      });
    }
  }

  /**
   * Partial update
   */
  async partialUpdate(req, res) {
    try {
      const prompt = await promptsService.partialUpdate(req.params.id, req.body);

      if (!prompt) {
        return res.status(404).json({
          success: false,
          error: "Prompt not found"
        });
      }

      res.json({
        success: true,
        message: "Prompt updated successfully",
        data: prompt
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to update prompt",
        details: error.message
      });
    }
  }

  /**
   * Increment likes
   */
  async likePrompt(req, res) {
    try {
      const prompt = await promptsService.incrementLikes(req.params.id);

      if (!prompt) {
        return res.status(404).json({
          success: false,
          error: "Prompt not found"
        });
      }

      res.json({
        success: true,
        data: { likes: prompt.likes }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to like prompt",
        details: error.message
      });
    }
  }

  /**
   * Increment uses
   */
  async usePrompt(req, res) {
    try {
      const prompt = await promptsService.incrementUses(req.params.id);

      if (!prompt) {
        return res.status(404).json({
          success: false,
          error: "Prompt not found"
        });
      }

      res.json({
        success: true,
        data: { uses: prompt.uses }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to increment uses",
        details: error.message
      });
    }
  }

  /**
   * Delete a prompt
   */
  async deletePrompt(req, res) {
    try {
      const { permanent } = req.query;
      const isPermament = permanent === "true";

      const result = await promptsService.deletePrompt(req.params.id, isPermament);

      if (!result) {
        return res.status(404).json({
          success: false,
          error: "Prompt not found"
        });
      }

      res.json({
        success: true,
        message: isPermament ? "Prompt permanently deleted" : "Prompt deactivated successfully",
        data: isPermament ? null : result
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          error: "Invalid prompt ID"
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to delete prompt",
        details: error.message
      });
    }
  }

  /**
   * Get prompts by category
   */
  async getPromptsByCategory(req, res) {
    try {
      const { limit } = req.query;
      const prompts = await promptsService.getPromptsByCategory(req.params.category, limit);

      res.json({
        success: true,
        data: prompts,
        count: prompts.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch prompts by category",
        details: error.message
      });
    }
  }

  /**
   * Get prompts by tag
   */
  async getPromptsByTag(req, res) {
    try {
      const prompts = await promptsService.getPromptsByTag(req.params.tag);

      res.json({
        success: true,
        data: prompts,
        count: prompts.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch prompts by tag",
        details: error.message
      });
    }
  }

  /**
   * Get popular prompts
   */
  async getPopularPrompts(req, res) {
    try {
      const { limit } = req.query;
      const prompts = await promptsService.getPopularPrompts(limit);

      res.json({
        success: true,
        data: prompts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch popular prompts",
        details: error.message
      });
    }
  }

  /**
   * Get all categories
   */
  async getCategories(req, res) {
    try {
      const categories = await promptsService.getCategories();

      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch categories",
        details: error.message
      });
    }
  }

  /**
   * Search prompts
   */
  async searchPrompts(req, res) {
    try {
      const { q: query, page, limit } = req.query;

      if (!query) {
        return res.status(400).json({
          success: false,
          error: "Search query is required"
        });
      }

      const result = await promptsService.searchPrompts(query, { page, limit });

      res.json({
        success: true,
        data: result.prompts,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to search prompts",
        details: error.message
      });
    }
  }
}

module.exports = new PromptsController();