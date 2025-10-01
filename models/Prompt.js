const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    content: {
      type: String,
      required: [true, "Prompt content is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    coverImage: {
      type: String, // URL or path to uploaded image
      default: null,
    },
    resultType: {
      type: String,
      enum: ["text", "image", "video"],
      required: [true, "Result type is required"],
      default: "text",
    },
    sampleOutput: {
      type: String,
      trim: true,
      default: null,
    },
    worksBestWith: [
      {
        type: String,
        enum: [
          "GPT-4",
          "GPT-3.5",
          "Claude-3",
          "Claude-2",
          "Gemini Pro",
          "DALL-E 3",
          "Midjourney",
          "Stable Diffusion",
          "RunwayML",
          "Pika Labs",
        ],
      },
    ],
    version: {
      type: Number,
      default: 1,
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      trim: true,
    },
    updatedBy: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    uses: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
PromptSchema.index({ title: "text", description: "text", tags: "text" });
PromptSchema.index({ category: 1 });
PromptSchema.index({ tags: 1 });
PromptSchema.index({ createdAt: -1 });
PromptSchema.index({ likes: -1 });
PromptSchema.index({ views: -1 });

// Virtual for formatted version
PromptSchema.virtual("versionString").get(function () {
  return `v${this.version}`;
});

// Pre-save middleware to increment version if content changes
PromptSchema.pre("save", function (next) {
  if (!this.isNew && this.isModified("content")) {
    this.version += 1;
  }
  next();
});

module.exports = mongoose.model("Prompt", PromptSchema);
