# MVC Architecture Documentation

## Overview

The backend has been refactored to follow the Model-View-Controller (MVC) architectural pattern for better code organization, maintainability, and scalability.

## Project Structure

```
├── app.js                 # Main application entry point
├── config/                # Configuration files
│   ├── constants.js       # Application constants
│   └── database.js        # Database connection configuration
├── controllers/           # Controllers (handle HTTP requests/responses)
│   ├── commentsController.js
│   ├── healthController.js
│   └── usersController.js
├── middlewares/           # Custom middleware
│   ├── connection.js      # Database connection middleware
│   ├── errorHandler.js    # Global error handling
│   └── notFound.js        # 404 handler
├── models/                # Data models (Mongoose schemas)
│   ├── comments.js
│   └── users.js
├── routes/                # Route definitions
│   ├── comments.js
│   ├── health.js
│   └── users.js
├── services/              # Business logic layer
│   ├── commentsService.js
│   └── usersService.js
└── validators/            # Input validation rules
    ├── commentValidators.js
    └── userValidators.js
```

## Architecture Layers

### 1. Models (Data Layer)

- **Location**: `models/`
- **Purpose**: Define data structure and database schemas
- **Technologies**: Mongoose ODM
- **Files**:
  - `comments.js` - Comment schema with validation rules
  - `users.js` - User schema with validation rules

### 2. Controllers (Presentation Layer)

- **Location**: `controllers/`
- **Purpose**: Handle HTTP requests and responses
- **Responsibilities**:
  - Parse request parameters
  - Call appropriate service methods
  - Format and send responses
  - Handle validation errors
- **Files**:
  - `commentsController.js` - Comment CRUD operations
  - `usersController.js` - User CRUD operations
  - `promptsController.js` - Prompt CRUD operations
  - `healthController.js` - Health check endpoint

### 3. Services (Business Logic Layer)

- **Location**: `services/`
- **Purpose**: Contain business logic and data manipulation
- **Responsibilities**:
  - Database operations
  - Data processing
  - Business rule enforcement
  - Complex queries and aggregations
- **Files**:
  - `commentsService.js` - Comment business logic
  - `usersService.js` - User business logic
  - `promptsService.js` - Prompt business logic

### 4. Routes (Routing Layer)

- **Location**: `routes/`
- **Purpose**: Define API endpoints and connect them to controllers
- **Responsibilities**:
  - URL pattern matching
  - HTTP method handling
  - Middleware application
  - Input validation
- **Files**:
  - `comments.js` - Comment API routes
  - `users.js` - User API routes
  - `prompts.js` - Prompt API routes
  - `health.js` - Health check route

### 5. Validators (Validation Layer)

- **Location**: `validators/`
- **Purpose**: Input validation and sanitization
- **Technologies**: express-validator
- **Files**:
  - `commentValidators.js` - Comment input validation rules
  - `userValidators.js` - User input validation rules
  - `promptValidators.js` - Prompt input validation rules

### 6. Middlewares (Cross-cutting Concerns)

- **Location**: `middlewares/`
- **Purpose**: Handle cross-cutting concerns
- **Files**:
  - `errorHandler.js` - Global error handling
  - `notFound.js` - 404 error handling
  - `connection.js` - Database connection
  - `upload.js` - File upload handling

### 7. Configuration

- **Location**: `config/`
- **Purpose**: Application configuration and constants
- **Files**:
  - `constants.js` - Application-wide constants
  - `database.js` - Database connection configuration

## API Endpoints

### Comments API

- `GET /api/comments/prompt/:promptId` - Get comments by prompt
- `GET /api/comments/user/:userId` - Get comments by user
- `GET /api/comments/:id` - Get comment by ID
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Users API

- `GET /api/users` - Get all users (paginated)
- `GET /api/users/search` - Search users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health API

- `GET /api/health` - Health check

## Benefits of MVC Architecture

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Maintainability**: Code is organized and easy to maintain
3. **Scalability**: Easy to add new features and endpoints
4. **Testability**: Each layer can be tested independently
5. **Reusability**: Services can be reused across different controllers
6. **Error Handling**: Centralized error handling and validation

## Best Practices Implemented

1. **Input Validation**: Using express-validator for robust input validation
2. **Error Handling**: Global error handling middleware
3. **Security**: Password exclusion from user responses
4. **Pagination**: Consistent pagination across endpoints
5. **Response Format**: Standardized API response format
6. **Documentation**: JSDoc comments for API documentation
7. **Constants**: Centralized configuration and constants

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install the new express-validator dependency:

   ```bash
   npm install express-validator
   ```

3. Start the server:
   ```bash
   npm start
   ```

The refactored backend maintains all existing functionality while providing a more organized and maintainable codebase.

### Prompts API

- `GET /api/prompts` - Get all prompts (with filtering and pagination)
- `GET /api/prompts/search` - Search prompts
- `GET /api/prompts/popular` - Get popular prompts
- `GET /api/prompts/categories` - Get all categories
- `GET /api/prompts/category/:category` - Get prompts by category
- `GET /api/prompts/tag/:tag` - Get prompts by tag
- `GET /api/prompts/:id` - Get prompt by ID
- `POST /api/prompts` - Create new prompt (with file upload)
- `PUT /api/prompts/:id` - Update prompt (with file upload)
- `PATCH /api/prompts/:id` - Partial update prompt
- `PATCH /api/prompts/:id/like` - Increment likes
- `PATCH /api/prompts/:id/use` - Increment uses
- `DELETE /api/prompts/:id` - Delete prompt (soft/hard delete)

## New Features Added in Prompts MVC

### File Upload Support

- **Multer Integration**: Secure file upload for prompt cover images
- **File Validation**: Only PNG, JPG, JPEG, and WebP images allowed
- **Size Limits**: Maximum 5MB file size
- **Error Handling**: Comprehensive upload error handling

### Advanced Filtering

- **Text Search**: Full-text search across title, description, and tags
- **Category Filtering**: Filter prompts by category
- **Tag Filtering**: Filter by multiple tags
- **Model Compatibility**: Filter by AI models (GPT-4, Claude, etc.)
- **Status Filtering**: Filter by active/inactive status

### Performance Optimizations

- **Database Indexing**: Optimized indexes for search and filtering
- **Pagination**: Efficient pagination for large datasets
- **Lean Queries**: Memory-efficient database queries

### Analytics Features

- **View Tracking**: Automatic view count increment
- **Like System**: User engagement tracking
- **Usage Statistics**: Track prompt usage

The refactored prompts module now follows proper MVC architecture with separation of concerns, comprehensive validation, and enhanced functionality.
