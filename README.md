📘 CS-465 – Module 6: Angular Single Page Application (SPA) – README
Overview

Module 6 focuses on building the client-side administration SPA for Travlr Getaways using Angular.
In this module, I created a functional single-page application capable of displaying trips, adding new trips, editing existing trips, and updating data through interactions with the Express API from earlier modules.

This README summarizes the architecture, implemented components, functionality, testing steps, and the learning experience.

Angular Project Structure

Angular uses a highly modular architecture compared to the earlier Express HTML project.
Key differences include:

Component-based UI instead of server-rendered pages

TypeScript instead of JavaScript for strongly typed development

Services (like TripDataService) for API communication

Standalone components (TripList, TripCard, TripForm)

Reactive updates without reloading the page

Routing is handled on the client side

Folder highlights:

/src
 └── /app
      ├── trip-list/
      ├── trip-card/
      ├── trip-form/
      ├── trip-data.service.ts
      └── app.routes.ts


This structure encourages separation of concerns and reusable UI components.

SPA Components Implemented
1️ TripListComponent

Loads all trips from the API

Displays a list of cards

Allows selecting a trip to edit

Allows creating a new trip

2️ TripCardComponent

Displays individual trip details

Used for listing all trips visually

3️ TripFormComponent

Used for creating OR editing trips

Handles form inputs and validation

Sends POST/PUT requests through the service

4️ TripDataService

Handles all communication with:

http://localhost:3000/api/trips


API methods built:

getTrips()

getTrip(code)

addTrip(trip)

updateTrip(code, trip)

deleteTrip(code)

API Integration

This module connects the Angular SPA to the Express/MongoDB API from Module 5.
The SPA performs:

GET requests to load trip cards

POST requests to create trips

PUT requests to edit/update trips

DELETE requests to remove trips

This demonstrates full CRUD capability through an Angular client.

Testing Process
To ensure API + SPA communication works:

Start the Express server

npm run dev

Start the Angular application

ng serve --open

Verify the following:

Trip list loads without errors

Adding a trip updates the UI without a page reload

Editing shows the correct form values

Updating a trip saves changes to the database

Error messages appear if fields are missing or the API fails

SPA Functionality vs Traditional Web App

Compared to the earlier Express HTML pages:

SPA Advantages

Faster user interactions

No full-page reloads

Modular and reactive UI

Cleaner separation between data (API) and views (Angular)

Reusable components

SPA Disadvantages

More setup and configuration

Higher learning curve (TypeScript, Angular CLI)

Requires a build step

More files and structure to maintain
