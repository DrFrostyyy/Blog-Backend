
## Author: Jana Erika Cornejo, IT4C
This repository, maintained on the feature/production-ready branch, serves as the final project for IT4C, focusing on implementing critical security hardening measures and architectural patterns in a 
modern Node.js/Express application.

### Focus Areas:
This project demonstrates the successful implementation of several key production-ready features:

Security Hardening: Implementation of essential security headers and middleware, including CORS configuration and preparation for HTTPS deployment.

Rate Limiting: Protecting API endpoints against brute-force attacks and abuse using robust rate limiting middleware.

API Versioning: Structuring the API to support multiple versions (e.g., /api/v1/) to ensure backward compatibility and smooth future updates.

Comprehensive Documentation: Utilizing Swagger/OpenAPI to automatically generate and host interactive documentation for all API routes.

Features & Architecture: The application is built on the principle of Separation of Concerns.

Express.js Backend: A fast and minimalist web framework for Node.js.

Security Middleware: Utilizing helmet and custom middleware for enhanced security.

File Upload Handling: Integrated functionality for secure file uploads.

Environment Configuration: Use of .env files for managing sensitive configuration variables.

In-Memory Data Store: Simple data persistence for lab exercises (can be easily swapped for a database).

## Technology Stack
Runtime: Node.js

Framework: Express.js

Documentation: Swagger/OpenAPI

Security: Helmet, CORS Middleware

Utilities: dotenv, express-rate-limit

## Getting Started
Prerequisites:

Node.js

npm or yarn

## Install dependencies:

npm install
# or yarn install

## Configure Environment:
Create a .env file in the root directory and add necessary configuration variables (e.g., PORT, RATE_LIMIT_MAX).

## Running the Application
Start the server:

npm start
The API server will typically run on http://localhost:3000 (or the port specified in your .env file).

API Documentation (Swagger UI)
Once the server is running, the interactive API documentation is accessible at:

http://localhost:[PORT]/api-docs

This interface allows users and developers to explore, test, and understand all available API endpoints, including versioned routes (/api/v1/).
