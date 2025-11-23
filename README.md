# FrostByte API - Backend

A robust RESTful API for the FrostByte blogging platform, built for developers and tech enthusiasts.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** express-validator
- **Documentation:** Swagger/OpenAPI
- **File Upload:** Multer

## Features

- **Authentication & Authorization**
  - User registration with password hashing
  - JWT-based authentication
  - Protected routes with middleware
  - Ownership verification for resources

- **Blog Post Management**
  - Full CRUD operations
  - Author information with posts
  - Post ownership validation
  - Pagination-ready structure

- **Comment System**
  - Add comments to posts
  - Author attribution
  - Nested comment structure support

- **User Profiles**
  - User information management
  - View user's posts
  - Profile statistics

- **Photo Uploads**
  - Image upload with Multer
  - File path storage in database
  - Physical file management
  - User-owned photo galleries

- **Security Features**
  - Helmet for secure HTTP headers
  - CORS configuration
  - Rate limiting (global and auth-specific)
  - Input validation and sanitization
  - SQL injection prevention with parameterized queries

- **API Documentation**
  - Interactive Swagger UI
  - Comprehensive endpoint documentation
  - Request/response examples
  - Try-it-out functionality

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
   git clone https://github.com/DrFrostyyy/Blog-Backend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   NODE_ENV=development
   PORT=3000
   
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_DATABASE=blogdatabase
   
   # JWT Secret
   JWT_SECRET=change-this-bro
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
```

4. **Set up the database**
   
   Create the database and tables:
```sql
   CREATE DATABASE blogdatabase;
   USE blogdatabase;
   
   -- Users table
   CREATE TABLE users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     username VARCHAR(255) NOT NULL UNIQUE,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Posts table
   CREATE TABLE posts (
     id INT PRIMARY KEY AUTO_INCREMENT,
     title VARCHAR(255) NOT NULL,
     content TEXT NOT NULL,
     authorId INT NOT NULL,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
   );
   
   -- Comments table
   CREATE TABLE comments (
     id INT PRIMARY KEY AUTO_INCREMENT,
     text TEXT NOT NULL,
     postId INT NOT NULL,
     authorId INT NOT NULL,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
     FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
   );
   
   -- Photos table
   CREATE TABLE photos (
     id INT PRIMARY KEY AUTO_INCREMENT,
     caption VARCHAR(255),
     filePath VARCHAR(255) NOT NULL,
     userId INT NOT NULL,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
   );
```

5. **Create uploads directory**
```bash
   mkdir uploads
```

6. **Start the server**
```bash
   npm start
   # or for development with nodemon
   npm run dev
```

The server will start on `http://localhost:3000`

## API Documentation

Once the server is running, access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Posts
- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:id` - Get post by ID
- `POST /api/v1/posts` - Create post (auth required)
- `PUT /api/v1/posts/:id` - Update post (auth + ownership required)
- `PATCH /api/v1/posts/:id` - Partially update post (auth required)
- `DELETE /api/v1/posts/:id` - Delete post (auth + ownership required)

### Comments
- `GET /api/v1/comments` - Get all comments
- `GET /api/v1/comments/posts/:postId/comments` - Get comments for a post
- `POST /api/v1/comments/posts/:postId/comments` - Create comment (auth required)

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `GET /api/v1/users/:userId/posts` - Get user's posts

### Photos
- `GET /api/v1/photos` - Get user's photos (auth required)
- `POST /api/v1/photos/upload` - Upload photo (auth required)
- `DELETE /api/v1/photos/:id` - Delete photo (auth + ownership required)

## Security Features

### Rate Limiting
- **Global:** 100 requests per 15 minutes
- **Authentication:** 5 attempts per 15 minutes

### Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### CORS
Configured to accept requests only from the specified frontend URL.

### Input Validation
All inputs are validated using express-validator before processing.

## Testing

Test the API using:
- **Swagger UI:** `http://localhost:3000/api-docs`
- **Postman:** Import the collection from Swagger
- **cURL:** Command-line testing

Example request:
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Dependencies

### Core
- `express` - Web framework
- `mysql2` - MySQL driver with promise support
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables

### Middleware
- `helmet` - Security headers
- `cors` - Cross-origin resource sharing
- `express-rate-limit` - Rate limiting
- `express-validator` - Input validation
- `multer` - File upload handling

### Documentation
- `swagger-jsdoc` - Generate Swagger spec from JSDoc
- `swagger-ui-express` - Serve Swagger UI

## Architecture

### Design Patterns
- **MVC Pattern:** Separation of routes, controllers, and services
- **Service Layer:** Business logic isolated from HTTP concerns
- **Middleware Chain:** Reusable request/response processors
- **Repository Pattern:** Data access abstraction via services

### Key Principles
- **Separation of Concerns:** Each layer has a single responsibility
- **DRY (Don't Repeat Yourself):** Reusable utilities and middleware
- **Security First:** Multiple layers of security measures
- **Error Handling:** Centralized error handler with consistent responses

## Author

**Jana Cornejo**
- Program: Information Technology

## Contributing

This is a personal project. Contributions are not currently accepted.

## Support

For questions or issues, please refer to the API documentation at `/api-docs` or contact the author.
