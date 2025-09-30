const express = require("express");
const router = express.Router();
const Prompt = require("../models/Prompt");

// Validation middleware
const validatePrompt = (req, res, next) => {
  const { title, description, content, modelCompatibility } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Description is required" });
  }
  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content is required" });
  }
  if (
    !modelCompatibility ||
    !Array.isArray(modelCompatibility) ||
    modelCompatibility.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "At least one model compatibility is required" });
  }

  next();
};

// CREATE - Create a new prompt
router.post("/", validatePrompt, async (req, res) => {
  try {
    const promptData = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      tags: req.body.tags || [],
      samples: req.body.samples || [],
      modelCompatibility: req.body.modelCompatibility,
      createdBy: req.body.createdBy || "system",
    };

    const prompt = new Prompt(promptData);
    await prompt.save();

    res.status(201).json({
      success: true,
      message: "Prompt created successfully",
      data: prompt,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: Object.values(error.errors).map((e) => e.message),
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to create prompt",
      details: error.message,
    });
  }
});

// READ - Get all prompts with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      tags,
      modelCompatibility,
      isActive,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    // Text search across title, description, and tags
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by tags
    if (tags) {
      query.tags = { $in: tags.split(",").map((t) => t.trim().toLowerCase()) };
    }

    // Filter by model compatibility
    if (modelCompatibility) {
      query.modelCompatibility = { $in: modelCompatibility.split(",") };
    }

    // Filter by active status
    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const [prompts, total] = await Promise.all([
      Prompt.find(query).sort(sort).skip(skip).limit(parseInt(limit)).lean(),
      Prompt.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: prompts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch prompts",
      details: error.message,
    });
  }
});

// READ - Get a single prompt by ID
router.get("/:id", async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json({
        success: false,
        error: "Prompt not found",
      });
    }

    res.json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid prompt ID",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to fetch prompt",
      details: error.message,
    });
  }
});

// UPDATE - Update a prompt by ID
router.put("/:id", validatePrompt, async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      tags: req.body.tags,
      samples: req.body.samples,
      modelCompatibility: req.body.modelCompatibility,
      isActive: req.body.isActive,
      updatedBy: req.body.updatedBy || "system",
    };

    const prompt = await Prompt.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!prompt) {
      return res.status(404).json({
        success: false,
        error: "Prompt not found",
      });
    }

    res.json({
      success: true,
      message: "Prompt updated successfully",
      data: prompt,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: Object.values(error.errors).map((e) => e.message),
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid prompt ID",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to update prompt",
      details: error.message,
    });
  }
});

// PATCH - Partial update (for toggling isActive, etc.)
router.patch("/:id", async (req, res) => {
  try {
    const allowedUpdates = ["isActive", "tags", "updatedBy"];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const prompt = await Prompt.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!prompt) {
      return res.status(404).json({
        success: false,
        error: "Prompt not found",
      });
    }

    res.json({
      success: true,
      message: "Prompt updated successfully",
      data: prompt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update prompt",
      details: error.message,
    });
  }
});

// DELETE - Delete a prompt by ID (soft delete by setting isActive to false)
router.delete("/:id", async (req, res) => {
  try {
    const { permanent } = req.query;

    if (permanent === "true") {
      // Hard delete
      const prompt = await Prompt.findByIdAndDelete(req.params.id);

      if (!prompt) {
        return res.status(404).json({
          success: false,
          error: "Prompt not found",
        });
      }

      return res.json({
        success: true,
        message: "Prompt permanently deleted",
      });
    }

    // Soft delete
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!prompt) {
      return res.status(404).json({
        success: false,
        error: "Prompt not found",
      });
    }

    res.json({
      success: true,
      message: "Prompt deactivated successfully",
      data: prompt,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid prompt ID",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete prompt",
      details: error.message,
    });
  }
});

// GET - Get prompts by tag
router.get("/tags/:tag", async (req, res) => {
  try {
    const prompts = await Prompt.find({
      tags: req.params.tag.toLowerCase(),
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: prompts,
      count: prompts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch prompts by tag",
      details: error.message,
    });
  }
});

// GET - Get version history (if you implement versioning separately)
router.get("/:id/versions", async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json({
        success: false,
        error: "Prompt not found",
      });
    }

    res.json({
      success: true,
      data: {
        currentVersion: prompt.version,
        versionString: prompt.versionString,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch version history",
      details: error.message,
    });
  }
});

module.exports = router;
