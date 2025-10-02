const { body } = require('express-validator');

const createCommentValidator = [
  body('user')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB ObjectId'),
  
  body('prompt')
    .notEmpty()
    .withMessage('Prompt ID is required')
    .isMongoId()
    .withMessage('Prompt ID must be a valid MongoDB ObjectId'),
  
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters')
];

const updateCommentValidator = [
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters')
];

module.exports = {
  createCommentValidator,
  updateCommentValidator
};