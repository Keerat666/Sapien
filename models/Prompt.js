const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
      trim: true,
    },
    output: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

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
      required: [true, "Content is required"],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    samples: {
      type: [SampleSchema],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: "Cannot have more than 10 samples",
      },
    },
    modelCompatibility: [
      {
        type: String,
        enum: [
          "gpt-4",
          "gpt-3.5-turbo",
          "claude-3",
          "claude-2",
          "palm-2",
          "llama-2",
          "mistral",
          "gemini-pro",
        ],
        required: true,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
PromptSchema.index({ title: "text", description: "text", tags: "text" });
PromptSchema.index({ tags: 1 });
PromptSchema.index({ createdAt: -1 });

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
