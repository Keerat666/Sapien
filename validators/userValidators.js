const { body } = require('express-validator');

const createUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('avatar')
    .notEmpty()
    .withMessage('Avatar URL is required')
    .isURL()
    .withMessage('Please provide a valid URL for avatar'),
  
  body('bio')
    .notEmpty()
    .withMessage('Bio is required')
    .trim()
    .isLength({ max: 300 })
    .withMessage('Bio must be at most 300 characters'),
  
  body('loginMode')
    .optional()
    .isIn(['email', 'github'])
    .withMessage('Login mode must be either email or github')
];

const updateUserValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Please provide a valid URL for avatar'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Bio must be at most 300 characters'),
  
  body('loginMode')
    .optional()
    .isIn(['email', 'github'])
    .withMessage('Login mode must be either email or github')
];

module.exports = {
  createUserValidator,
  updateUserValidator
};