Module 7 README – CS 465: Travlr Getaways SPA Deployment & Integration
Overview

Module 7 focuses on integrating the Angular Single Page Application (SPA) with the Express-based API and ensuring the Travlr Getaways administration interface functions as a modern, client-side managed system. The goal of this module is to prepare the SPA for final deployment, verify communication with the REST API, and complete the client-side CRUD functionality for managing trip data.

What This Module Includes
API Integration with the Angular SPA

Configuring Angular services to consume the Express API

Connecting GET, POST, PUT, and DELETE operations

Ensuring cross-origin communication works during local development

Final Trip Management Features

Viewing trip listings

Adding a new trip

Editing an existing trip

Updating trip details

Deleting trips

Testing & Verification

Using browser DevTools to examine network requests

Confirming API endpoints return JSON under admin interactions

Verifying MongoDB data updates (if used in earlier modules)

Key Files Updated in Module 7
Component	Location	Description
trip-data.service.ts	src/app	Handles communication with Express API
trip-list component	src/app/trip-list	Displays the full trip listing
trip-card component	src/app/trip-card	Represents a single trip
trip-form component	src/app/trip-form	Used for editing/adding trips
Express API	/app_api/routes, /app_api/controllers	Responds to SPA requests
Testing Steps Completed
1. GET Trips
Verified with:

Browser load

Network tab

Direct API test at http://localhost:3000/api/trips

2. POST Trip
Added a new trip using the SPA form

Confirmed, it appears in the card listing

3. PUT Trip
Opened “Edit” screen

Updated a field

Confirmed the card and API reflect the changes

4. DELETE Trip
Removed a trip

Verified it no longer appears and is deleted from the API

Screenshots Submitted for Module 7

A card listing showing an additional trip

Edit screen

Update confirmation

Reflection

Module 7 tied together all previous modules by enabling full interaction between the Angular SPA and the Express API. The ability to manage data client-side without reloading the entire page demonstrates the power of modern SPA architecture. This also prepares the application for deployment and further scalability.
