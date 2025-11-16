// app_server/routes/admin.js
const express = require('express');
const router = express.Router();

// Demo data (static for Module 2/3)
const stats = {
  tripsTotal: 5,
  usersTotal: 3,
  pendingReservations: 2
};

const users = [
  { id: 1, name: 'Alice Johnson', role: 'admin',    email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith',     role: 'editor',   email: 'bob@example.com' },
  { id: 3, name: 'Cara Davis',    role: 'customer', email: 'cara@example.com' }
];

// Demo trips (same style as your travel page)
const trips = [
  { id: 1, name: 'Paris, France',  length: 7,  start: '2025-06-10', resort: 'Hotel Le Meurice',        price: 2499 },
  { id: 2, name: 'Tokyo, Japan',   length: 8,  start: '2025-07-01', resort: 'Park Hyatt Tokyo',       price: 3150 },
  { id: 3, name: 'Hawaii, USA',    length: 6,  start: '2025-08-15', resort: 'Royal Hawaiian Resort',  price: 2200 },
  { id: 4, name: 'Rome, Italy',    length: 10, start: '2025-09-05', resort: 'Hotel de Russie',        price: 2790 }
];

// Admin dashboard
router.get('/', (req, res) => {
  // NOTE: matches app_server/views/admin/dashboard.hbs
  res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    stats,
    users
  });
});

// ----- Trips admin screens -----

// List all trips
router.get('/trips', (req, res) => {
  res.render('admin/trips', {
    title: 'Manage Trips',
    trips
  });
});

// Show Add Trip form
router.get('/trips/add', (req, res) => {
  res.render('admin/trip-edit', {
    title: 'Add a Trip',
    trip: {} // empty trip for the form
  });
});

// Show Edit Trip form
router.get('/trips/edit/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const trip = trips.find(t => t.id === id);

  if (!trip) {
    return res.status(404).send('Trip not found');
  }

  res.render('admin/trip-edit', {
    title: 'Edit Trip',
    trip
  });
});

module.exports = router;


