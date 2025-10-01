const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Prompt = require("../models/Prompt");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cover-images/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "cover-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only PNG and JPG images are allowed"));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Validation middleware
const validatePrompt = (req, res, next) => {
  const { title, description, content, category, resultType } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ success: false, error: "Title is required" });
  }
  if (!description || description.trim() === "") {
    return res
      .status(400)
      .json({ success: false, error: "Description is required" });
  }
  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ success: false, error: "Prompt content is required" });
  }
  if (!category || category.trim() === "") {
    return res
      .status(400)
      .json({ success: false, error: "Category is required" });
  }
  if (!resultType) {
    return res
      .status(400)
      .json({ success: false, error: "Result type is required" });
  }

  next();
};

// CREATE - Create a new prompt with optional file upload
router.post(
  "/",
  upload.single("coverImage"),
  validatePrompt,
  async (req, res) => {
    try {
      const promptData = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        category: req.body.category,
        tags: req.body.tags
          ? Array.isArray(req.body.tags)
            ? req.body.tags
            : req.body.tags.split(",").map((t) => t.trim())
          : [],
        coverImage: req.file
          ? `/uploads/cover-images/${req.file.filename}`
          : null,
        resultType: req.body.resultType,
        sampleOutput: req.body.sampleOutput || null,
        worksBestWith: req.body.worksBestWith
          ? Array.isArray(req.body.worksBestWith)
            ? req.body.worksBestWith
            : req.body.worksBestWith.split(",")
          : [],
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
  }
);

// READ - Get all prompts with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      tags,
      resultType,
      worksBestWith,
      isActive,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    // Text search across title, description, and tags
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by tags
    if (tags) {
      query.tags = { $in: tags.split(",").map((t) => t.trim().toLowerCase()) };
    }

    // Filter by result type
    if (resultType) {
      query.resultType = resultType;
    }

    // Filter by model compatibility
    if (worksBestWith) {
      query.worksBestWith = { $in: worksBestWith.split(",") };
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

    // Increment view count
    prompt.views += 1;
    await prompt.save();

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
router.put(
  "/:id",
  upload.single("coverImage"),
  validatePrompt,
  async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        category: req.body.category,
        tags: req.body.tags
          ? Array.isArray(req.body.tags)
            ? req.body.tags
            : req.body.tags.split(",").map((t) => t.trim())
          : [],
        resultType: req.body.resultType,
        sampleOutput: req.body.sampleOutput,
        worksBestWith: req.body.worksBestWith
          ? Array.isArray(req.body.worksBestWith)
            ? req.body.worksBestWith
            : req.body.worksBestWith.split(",")
          : [],
        isActive: req.body.isActive,
        updatedBy: req.body.updatedBy || "system",
      };

      // Update cover image if new file uploaded
      if (req.file) {
        updateData.coverImage = `/uploads/cover-images/${req.file.filename}`;
      }

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
  }
);

// PATCH - Partial update
router.patch("/:id", async (req, res) => {
  try {
    const allowedUpdates = ["isActive", "tags", "updatedBy", "likes", "uses"];
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

// PATCH - Increment likes
router.patch("/:id/like", async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
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
      data: { likes: prompt.likes },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to like prompt",
      details: error.message,
    });
  }
});

// PATCH - Increment uses
router.patch("/:id/use", async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $inc: { uses: 1 } },
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
      data: { uses: prompt.uses },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to increment uses",
      details: error.message,
    });
  }
});

// DELETE - Delete a prompt by ID
router.delete("/:id", async (req, res) => {
  try {
    const { permanent } = req.query;

    if (permanent === "true") {
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

// GET - Get prompts by category
router.get("/category/:category", async (req, res) => {
  try {
    const prompts = await Prompt.find({
      category: req.params.category,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: prompts,
      count: prompts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch prompts by category",
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

// GET - Get popular prompts
router.get("/feed/popular", async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const prompts = await Prompt.find({ isActive: true })
      .sort({ likes: -1, views: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: prompts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch popular prompts",
      details: error.message,
    });
  }
});

// GET - Get all unique categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Prompt.distinct("category");
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch categories",
      details: error.message,
    });
  }
});

module.exports = router;
