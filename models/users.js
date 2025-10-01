const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      description: "Required Field",
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must be at most 50 characters"],
    },
    username: {
      type: String,
      required: true,
      description: "Required Field",
      trim: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username must be at most 30 characters"],
    },
    email: {
      type: String,
      required: true,
      description: "Required Field",
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      description: "Required Field",
      minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
      type: String,
      required: true,
      description: "Required Field",
      match: [
        /^(http|https):\/\/[^ "]+$/,
        "Please provide a valid URL for avatar",
      ],
    },
    bio: {
      type: String,
      required: true,
      description: "Required Field",
      maxlength: [300, "Bio must be at most 300 characters"],
    },
    lastLogin: {
      type: Date,
      required: true,
      description: "Required Field",
      default: Date.now,
    },
    loginMode: {
      type: String,
      required: true,
      description: "Required Field",
      enum: ["email","github"],
      default: "email",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt as Date
  }
);

module.exports = mongoose.model("users", usersSchema);
