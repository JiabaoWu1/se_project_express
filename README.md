What to Wear - Backend
This is the backend for the What to Wear application, built using Express.js and MongoDB. The backend manages user and clothing item data, handling various API requests to support seamless interaction with the front end.

Tech Stack
Backend Framework: Express.js
Database: MongoDB
API Testing: Postman
Project Overview
The backend is designed to:
✅ Handle user authentication and data management
✅ Manage clothing item records (adding, updating, and deleting items)
✅ Provide secure and efficient API endpoints
✅ Ensure smooth connectivity between the front end and database

API Endpoints
Users
GET /users – Retrieve all users
GET /users/:userId – Retrieve a specific user
POST /users – Create a new user
PUT /users/:userId – Update user details
DELETE /users/:userId – Delete a user
Clothing Items
GET /items – Retrieve all clothing items
POST /items – Add a new clothing item
PUT /items/:itemId – Update item details
DELETE /items/:itemId – Remove a clothing item
Error Handling
Uses predefined constants instead of hardcoded messages for cleaner code
Implements .orFail() for better error detection
Provides meaningful error responses (e.g., 400 Bad Request, 404 Not Found, 500 Internal Server Error)

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
