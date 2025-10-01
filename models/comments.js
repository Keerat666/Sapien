const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      description: "Required Field - Reference to the user who made the comment",
    },
    prompt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prompts",
      required: true,
      description: "Required Field - Reference to the prompt being commented on",
    },
    content: {
      type: String,
      required: true,
      description: "Required Field - The comment content",
      trim: true,
      minlength: [1, "Comment content cannot be empty"],
      maxlength: [1000, "Comment must be at most 1000 characters"],
    },
    isEdited: {
      type: Boolean,
      default: false,
      description: "Indicates if the comment has been edited",
    },
    editedAt: {
      type: Date,
      description: "Timestamp when the comment was last edited",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt as Date
  }
);

// Index for better query performance
commentsSchema.index({ prompt: 1, createdAt: -1 });
commentsSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("comments", commentsSchema);