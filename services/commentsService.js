const Comment = require('../models/comments');

class CommentsService {
  /**
   * Get comments by prompt with pagination
   */
  async getCommentsByPrompt(promptId, options = {}) {
    const { page = 1, limit = 10, sort = "createdAt" } = options;
    
    const comments = await Comment.find({ prompt: promptId })
      .populate("user", "name username avatar")
      .sort({ [sort]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Comment.countDocuments({ prompt: promptId });

    return {
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get comments by user with pagination
   */
  async getCommentsByUser(userId, options = {}) {
    const { page = 1, limit = 10 } = options;
    
    const comments = await Comment.find({ user: userId })
      .populate("prompt", "title")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Comment.countDocuments({ user: userId });

    return {
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get comment by ID
   */
  async getCommentById(id) {
    return await Comment.findById(id)
      .populate("user", "name username avatar")
      .populate("prompt", "title");
  }

  /**
   * Create a new comment
   */
  async createComment(commentData) {
    const { user, prompt, content } = commentData;

    // Basic validation
    if (!user || !prompt || !content) {
      throw new Error("User, prompt, and content are required fields");
    }

    const newComment = new Comment({
      user,
      prompt,
      content: content.trim()
    });

    const savedComment = await newComment.save();
    
    // Return populated comment
    return await Comment.findById(savedComment._id)
      .populate("user", "name username avatar")
      .populate("prompt", "title");
  }

  /**
   * Update a comment
   */
  async updateComment(id, updateData) {
    const { content } = updateData;

    if (!content || content.trim().length === 0) {
      throw new Error("Content is required");
    }

    return await Comment.findByIdAndUpdate(
      id,
      { 
        content: content.trim(),
        isEdited: true,
        editedAt: new Date()
      },
      { new: true, runValidators: true }
    )
    .populate("user", "name username avatar")
    .populate("prompt", "title");
  }

  /**
   * Delete a comment
   */
  async deleteComment(id) {
    return await Comment.findByIdAndDelete(id);
  }

  /**
   * Get comment statistics
   */
  async getCommentStats(promptId) {
    const total = await Comment.countDocuments({ prompt: promptId });
    const recent = await Comment.countDocuments({ 
      prompt: promptId,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    return { total, recent };
  }
}

module.exports = new CommentsService();