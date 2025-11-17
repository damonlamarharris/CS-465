"# CS-465 Module 4 Project"



CS-465 Module 4 – Travlr Getaways: API Integration \& Admin Functionality



Overview



Module 4 expands on the Travlr Getaways application by introducing server-side API development, connecting the Express backend to Angular, and implementing secure admin functionality. This module demonstrates how the MEAN stack works together, how data flows from MongoDB through an Express API to the Angular front end, and how an authenticated admin can manage content.



What Was Implemented in Module 4

\### 1. API Layer Development (Express + Mongoose)



In this module, I created a full REST API that provides structured endpoints to access and modify trip data.

Key API features include:



GET /api/trips – return all trips



GET /api/trips/:tripId – return a single trip



POST /api/trips – allow admin users to add a trip



PUT /api/trips/:tripId – allow admin updates



DELETE /api/trips/:tripId – remove a trip



This API now serves as the bridge between the database and the Angular front end.



\### 2. Admin Authentication System



To protect the admin UI, I implemented:



A login page



A signup workflow



Password hashing (bcrypt)



Session / token-based authentication



Restricted admin routes



Redirects for unauthorized users



Only authenticated users can access:



/admin



/admin/trips



/admin/trip/edit/:id



This ensures the system maintains security and prevents unauthorized changes.



\### 3. Admin Page



A dedicated admin interface was built, allowing the admin to:



View all trips



Add a new trip



Edit existing trips



Remove trips



Manage account login/logout



This satisfies the requirement for a persistent, secure content-management screen.



\### 4. Angular Front-End Integration



In Module 4, the Angular SPA pulls data from the API using:



Angular services



HttpClient module



Observable streams



Two-way binding for forms



This introduced “rich functionality,” including:



Dynamic rendering of data



Client-side routing



Editable forms connected to the backend



Real-time updates when admin changes content



The Angular SPA now communicates fully with the Express API.



\### 5. Testing the Integration



To verify the system works end-to-end:



API Testing



Used Postman to test all REST endpoints



Verified successful GET/POST/PUT/DELETE responses



Checked error handling for invalid IDs



Angular ↔ API Testing



Launched Angular with ng serve



Launched Express with npm start



Validated that changes in the Admin Dashboard update the database



Confirmed the UI data refreshes automatically



Technologies Used



Node.js / Express



Angular SPA



MongoDB / Mongoose



Handlebars.js (server views)



REST API architecture



JSON Web Tokens / bcrypt



HTML, CSS, JavaScript



Project Structure (Module 4 Relevant Files)

CS-465/

│

├── app.js

├── app\_server/

│   ├── controllers/

│   ├── routes/

│   ├── models/

│   ├── views/

│

├── public/

│   ├── styles.css

│   ├── images/

│

├── travlr-express/        (Express backend)

│

└── travlr-client/         (Angular SPA)



Reflection



Module 4 strengthened my understanding of full-stack development by showing how the server API and Angular front-end communicate. I learned how authentication restricts access and how CRUD operations are performed securely. This module moved the project from simple static pages to a fully dynamic, data-driven web application with admin controls.

