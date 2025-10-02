const User = require('../models/users');

class UsersService {
  /**
   * Get all users with pagination
   */
  async getAllUsers(options = {}) {
    const { page = 1, limit = 10, sort = "createdAt" } = options;
    
    const users = await User.find()
      .select('-password') // Exclude password from results
      .sort({ [sort]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await User.countDocuments();

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(id) {
    return await User.findById(id).select('-password');
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email) {
    return await User.findOne({ email }).select('-password');
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username) {
    return await User.findOne({ username }).select('-password');
  }

  /**
   * Create a new user
   */
  async createUser(userData) {
    const { name, username, email, password, avatar, bio, loginMode = 'email' } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    const newUser = new User({
      name,
      username,
      email,
      password,
      avatar,
      bio,
      loginMode,
      lastLogin: new Date()
    });

    const savedUser = await newUser.save();
    
    // Return user without password
    return await User.findById(savedUser._id).select('-password');
  }

  /**
   * Update a user
   */
  async updateUser(id, updateData) {
    // Remove password from update data if present (should be handled separately)
    const { password, ...safeUpdateData } = updateData;

    return await User.findByIdAndUpdate(
      id,
      safeUpdateData,
      { new: true, runValidators: true }
    ).select('-password');
  }

  /**
   * Delete a user
   */
  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  /**
   * Update last login
   */
  async updateLastLogin(id) {
    return await User.findByIdAndUpdate(
      id,
      { lastLogin: new Date() },
      { new: true }
    ).select('-password');
  }

  /**
   * Search users by name or username
   */
  async searchUsers(query, options = {}) {
    const { page = 1, limit = 10 } = options;
    
    const searchRegex = new RegExp(query, 'i');
    
    const users = await User.find({
      $or: [
        { name: searchRegex },
        { username: searchRegex }
      ]
    })
    .select('-password')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

    const total = await User.countDocuments({
      $or: [
        { name: searchRegex },
        { username: searchRegex }
      ]
    });

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = new UsersService();