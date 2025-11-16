// app_server/routes/travel.js
const express = require('express');
const router = express.Router();

// --- Static Travel Data (Module 3 demo version) ---
const trips = [
  { id: 1, name: 'Paris, France', length: 7, start: '2025-06-10', resort: 'Hotel Le Meurice', price: 2499 },
  { id: 2, name: 'Tokyo, Japan', length: 8, start: '2025-07-01', resort: 'Park Hyatt Tokyo', price: 3150 },
  { id: 3, name: 'Hawaii, USA', length: 6, start: '2025-08-15', resort: 'Royal Hawaiian Resort', price: 2200 },
  { id: 4, name: 'Rome, Italy', length: 10, start: '2025-09-05', resort: 'Hotel de Russie', price: 2790 }
];

// List page (server-rendered)
router.get('/', (req, res) => {
  // Make sure you have a matching view like: app_server/views/travel.hbs
  res.render('travel', { title: 'Trips', trips });
});

// Simple JSON API (optional)
router.get('/api', (req, res) => {
  res.json({ trips });
});

// Single trip details (server-rendered)
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const trip = trips.find(t => t.id === id);
  if (!trip) {
    return res.status(404).render('404', { title: 'Trip Not Found' });
  }
  // Make sure you have a view like: app_server/views/trip.hbs
  res.render('trip', { title: trip.name, trip });
});

module.exports = router;


