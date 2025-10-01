const { body } = require('express-validator');

const createPromptValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
  
  body('content')
    .notEmpty()
    .withMessage('Prompt content is required')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Category cannot be empty'),
  
  body('resultType')
    .notEmpty()
    .withMessage('Result type is required')
    .isIn(['text', 'image', 'video'])
    .withMessage('Result type must be text, image, or video'),
  
  body('tags')
    .optional()
    .custom((value) => {
      if (typeof value === 'string') {
        return true; // Will be split by comma
      }
      if (Array.isArray(value)) {
        return value.every(tag => typeof tag === 'string');
      }
      return false;
    })
    .withMessage('Tags must be a string or array of strings'),
  
  body('worksBestWith')
    .optional()
    .custom((value) => {
      const validModels = [
        'GPT-4', 'GPT-3.5', 'Claude-3', 'Claude-2', 'Gemini Pro',
        'DALL-E 3', 'Midjourney', 'Stable Diffusion', 'RunwayML', 'Pika Labs'
      ];
      
      if (typeof value === 'string') {
        return value.split(',').every(model => validModels.includes(model.trim()));
      }
      if (Array.isArray(value)) {
        return value.every(model => validModels.includes(model));
      }
      return true; // Optional field
    })
    .withMessage('Invalid model in worksBestWith field'),
  
  body('sampleOutput')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Sample output cannot exceed 2000 characters'),
  
  body('createdBy')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Created by must be between 1 and 100 characters')
];

const updatePromptValidator = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
  
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty'),
  
  body('category')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Category cannot be empty'),
  
  body('resultType')
    .optional()
    .isIn(['text', 'image', 'video'])
    .withMessage('Result type must be text, image, or video'),
  
  body('tags')
    .optional()
    .custom((value) => {
      if (typeof value === 'string') {
        return true;
      }
      if (Array.isArray(value)) {
        return value.every(tag => typeof tag === 'string');
      }
      return false;
    })
    .withMessage('Tags must be a string or array of strings'),
  
  body('worksBestWith')
    .optional()
    .custom((value) => {
      const validModels = [
        'GPT-4', 'GPT-3.5', 'Claude-3', 'Claude-2', 'Gemini Pro',
        'DALL-E 3', 'Midjourney', 'Stable Diffusion', 'RunwayML', 'Pika Labs'
      ];
      
      if (typeof value === 'string') {
        return value.split(',').every(model => validModels.includes(model.trim()));
      }
      if (Array.isArray(value)) {
        return value.every(model => validModels.includes(model));
      }
      return true;
    })
    .withMessage('Invalid model in worksBestWith field'),
  
  body('sampleOutput')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Sample output cannot exceed 2000 characters'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  
  body('updatedBy')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Updated by must be between 1 and 100 characters')
];

const partialUpdateValidator = [
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('updatedBy')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Updated by must be between 1 and 100 characters'),
  
  body('likes')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Likes must be a non-negative integer'),
  
  body('uses')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Uses must be a non-negative integer')
];

module.exports = {
  createPromptValidator,
  updatePromptValidator,
  partialUpdateValidator
};