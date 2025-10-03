const Prompt = require('../models/Prompt');

class PromptsService {
  /**
   * Get all prompts with filtering and pagination
   */
  async getAllPrompts(options = {}) {
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
      sortOrder = "desc"
    } = options;

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
      query.tags = { $in: tags.split(",").map(t => t.trim().toLowerCase()) };
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
      Prompt.countDocuments(query)
    ]);

    return {
      prompts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    };
  }

  /**
   * Get prompt by ID and increment view count
   */
  async getPromptById(id) {
    const prompt = await Prompt.findById(id);
    
    if (prompt) {
      // Increment view count
      prompt.views += 1;
      await prompt.save();
    }
    
    return prompt;
  }

  /**
   * Create a new prompt
   */
  async createPrompt(promptData) {
    const {
      title,
      description,
      content,
      category,
      tags = [],
      coverImage,
      resultType,
      sampleOutput,
      worksBestWith = [],
      createdBy = "system"
    } = promptData;

    const processedTags = Array.isArray(tags) 
      ? tags 
      : tags.split(",").map(t => t.trim());

    const processedWorksBestWith = Array.isArray(worksBestWith)
      ? worksBestWith
      : worksBestWith.split(",");

    const newPrompt = new Prompt({
      title,
      description,
      content,
      category,
      tags: processedTags,
      coverImage,
      resultType,
      sampleOutput,
      worksBestWith: processedWorksBestWith,
      createdBy
    });

    return await newPrompt.save();
  }

  /**
   * Update a prompt
   */
  async updatePrompt(id, updateData) {
    const {
      title,
      description,
      content,
      category,
      tags,
      coverImage,
      resultType,
      sampleOutput,
      worksBestWith,
      isActive,
      updatedBy = "system"
    } = updateData;

    const processedTags = tags 
      ? (Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim()))
      : undefined;

    const processedWorksBestWith = worksBestWith
      ? (Array.isArray(worksBestWith) ? worksBestWith : worksBestWith.split(","))
      : undefined;

    const updateFields = {
      title,
      description,
      content,
      category,
      resultType,
      sampleOutput,
      isActive,
      updatedBy
    };

    if (processedTags) updateFields.tags = processedTags;
    if (processedWorksBestWith) updateFields.worksBestWith = processedWorksBestWith;
    if (coverImage) updateFields.coverImage = coverImage;

    // Remove undefined fields
    Object.keys(updateFields).forEach(key => 
      updateFields[key] === undefined && delete updateFields[key]
    );

    return await Prompt.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true
    });
  }

  /**
   * Partial update for specific fields
   */
  async partialUpdate(id, updates) {
    const allowedUpdates = ["isActive", "tags", "updatedBy", "likes", "uses"];
    const filteredUpdates = {};

    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    return await Prompt.findByIdAndUpdate(id, filteredUpdates, {
      new: true,
      runValidators: true
    });
  }

  /**
   * Increment likes
   */
  async incrementLikes(id) {
    return await Prompt.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
  }

  /**
   * Increment uses
   */
  async incrementUses(id) {
    return await Prompt.findByIdAndUpdate(
      id,
      { $inc: { uses: 1 } },
      { new: true }
    );
  }

  /**
   * Delete prompt (soft or hard delete)
   */
  async deletePrompt(id, permanent = false) {
    if (permanent) {
      return await Prompt.findByIdAndDelete(id);
    } else {
      return await Prompt.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );
    }
  }

  /**
   * Get prompts by category
   */
  async getPromptsByCategory(category, limit = 50) {
    return await Prompt.find({
      category,
      isActive: true
    })
    .sort({ createdAt: -1 })
    .limit(limit);
  }

  /**
   * Get prompts by tag
   */
  async getPromptsByTag(tag) {
    return await Prompt.find({
      tags: tag.toLowerCase(),
      isActive: true
    }).sort({ createdAt: -1 });
  }

  /**
   * Get popular prompts
   */
  async getPopularPrompts(limit = 20) {
    return await Prompt.find({ isActive: true })
      .sort({ likes: -1, views: -1 })
      .limit(parseInt(limit));
  }

  /**
   * Get all unique categories
   */
  async getCategories() {
    return await Prompt.distinct("category");
  }

  /**
   * Get all unique tags
   */
  async getTags() {
    return await Prompt.distinct("tags");
  }

  /**
   * Get recent prompts with pagination
   */
  async getRecentPrompts(options = {}) {
    const { page = 1, limit = 10 } = options;

    const query = { isActive: true };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { createdAt: -1 }; // Sort by creation date, newest first

    const [prompts, total] = await Promise.all([
      Prompt.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Prompt.countDocuments(query)
    ]);

    return {
      prompts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    };
  }

  /**
   * Search prompts
   */
  async searchPrompts(query, options = {}) {
    const { page = 1, limit = 10 } = options;
    
    const searchQuery = {
      $text: { $search: query },
      isActive: true
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [prompts, total] = await Promise.all([
      Prompt.find(searchQuery)
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(parseInt(limit)),
      Prompt.countDocuments(searchQuery)
    ]);

    return {
      prompts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    };
  }
}

module.exports = new PromptsService();