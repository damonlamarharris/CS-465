Travler Getaways – Module 5: RESTful API (CS-465)
Overview
Module 5 introduces Separation of Concerns by moving all database access logic out of the MVC web application (app_server) and into a new RESTful API application (app_api). This API exposes structured JSON data for trips, enabling multiple clients, including Angular, Express, and external callers, to retrieve trip information programmatically.
This module completes the connection between:
	• MongoDB database
	• Express-based REST API
	• Frontend MVC application
By the end of this module, Travlr Getaways includes a fully functioning API accessible at /api, returning structured trip data using Mongoose and Express.js.

Project Structure (Module 5)

CS-465/
│
├── app.js                    # Main application file
│
├── app_server/               # MVC app (views, controllers, routes)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── views/
│
├── app_api/                  # NEW REST API for Module 5
│   ├── app.js (optional)
│   ├── models/
│   │   ├── db.js             # MongoDB connection & Mongoose initialization
│   │   └── trips.js          # Trip schema/model
│   ├── controllers/
│   │   └── trips.js          # API logic (Mongoose FIND / FIND ONE)
│   └── routes/
│       └── index.js          # API routes (/api/trips, /api/trips/:tripCode)
│
├── data/
│   └── trips.json            # Seed trip data
│
├── public/                   # Static assets
├── node_modules/
└── package.json


Database Integration
The API uses MongoDB + Mongoose to store and retrieve trip data.
Key connection file:
/app_api/models/db.js
	• Establishes the MongoDB connection
	• Loads the trip model
	• Logs connection events (connected, error, disconnected)
This separation ensures the MVC frontend no longer contains database queries, following proper architectural layering.

REST API Endpoints
All API endpoints begin with:

/api
GET /api/trips
Returns a complete list of trips from MongoDB.
Example response:

[
  {
    "_id": "691b976cf6fb866b8dd076d1",
    "code": "PARIS2025",
    "name": "Paris, France",
    "length": 7,
    "start": "2025-06-10T00:00:00.000Z",
    "resort": "Hotel Le Meurice",
    "price": 2499,
    "__v": 0
  }
]

GET /api/trips/:tripCode
Returns a single trip matching the provided trip code.
Example:

GET /api/trips/ROME2025
Example response:

{
  "_id": "691b976cf6fb866b8dd076d4",
  "code": "ROME2025",
  "name": "Rome, Italy",
  "length": 10,
  "start": "2025-09-05T00:00:00.000Z",
  "resort": "Hotel Eden",
  "price": 2899,
  "__v": 0
}

Mongoose Logic (Controller Summary)
All API logic lives in:
/app_api/controllers/trips.js
Retrieve All Trips
Uses:

Trip.find().exec()
Retrieve One Trip by Code
Uses:

Trip.findOne({ code: tripCode }).exec()
Error Handling
The controller returns:
	• 200 – Success
	• 404 – Trip not found
	• 400 – Missing parameter
	• 500 – Server/database error
This ensures the API is robust and responds with proper HTTP status codes.

Testing With Postman
Module 5 requires testing API behavior using Postman or a web browser.
Steps
	1. Start the server:

node app.js
	2. Test endpoints:
		○ GET http://localhost:3000/api/trips
		○ GET http://localhost:3000/api/trips/PARIS2025
Expected outcomes:
	• JSON response
	• Proper error messages
	• Correct use of Mongoose’s FIND method
	• HTTP status codes appear in Postman

Separation of Concerns (SOC)
Module 5 emphasizes SOC by splitting the application into two major components:
1. MVC Web App (app_server)
	• Renders views (.hbs)
	• Handles reservations, login, admin, etc.
	• Does not connect directly to MongoDB
2. REST API (app_api)
	• Communicates with MongoDB through Mongoose
	• Returns JSON only
	• Provides data to:
		○ Angular SPA
		○ Express MVC app
		○ External clients (Postman, etc.)
By dividing the project this way, each part becomes easier to maintain, extend, and debug.

How to Run the Application
	1. Install dependencies:

npm install
	2. Seed trips database if needed:

node seedTrips.js
	3. Start the server:

node app.js
	4. Visit web app:

http://localhost:3000/
	5. Test API:

http://localhost:3000/api/trips
http://localhost:3000/api/trips/PARIS2025

Conclusion
With Module 5 completed, the Travler Getaways project now includes:
	• A separated, fully functioning REST API
	• Mongoose-powered data retrieval
	• Standardized routing for trip data
	• Proper error handling
	• SOC-compliant architecture
	• Verified API functionality via Postman
This forms the backbone for future Angular integration in Module 6.




