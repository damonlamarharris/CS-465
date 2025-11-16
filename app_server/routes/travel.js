// app_server/routes/travel.js
const express = require("express");
const router = express.Router();

// --- Demo Trip Data (temporary until database integration) ---
const trips = [
  {
    id: 1,
    name: "Paris, France",
    length: 7,
    start: "2025-06-10",
    resort: "Hotel Le Meurice",
    price: 2499,
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    length: 8,
    start: "2025-07-01",
    resort: "Park Hyatt Tokyo",
    price: 3150,
  },
  {
    id: 3,
    name: "Hawaii, USA",
    length: 6,
    start: "2025-08-15",
    resort: "Royal Hawaiian Resort",
    price: 2200,
  },
  {
    id: 4,
    name: "Rome, Italy",
    length: 10,
    start: "2025-09-05",
    resort: "Hotel de Russie",
    price: 2790,
  },
];

// --- ROUTES ---

// List all trips
router.get("/", (req, res) => {
  // ✅ Ensure travel.hbs exists in app_server/views
  res.render("travel.hbs", { title: "Trips", trips });
});

// Provide JSON API for trips
router.get("/api", (req, res) => {
  res.json({ trips });
});

// Show single trip details
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return res.status(404).render("404.hbs", { title: "Trip Not Found" });
  }

  // ✅ Ensure trip.hbs exists in app_server/views
  res.render("trip.hbs", { title: trip.name, trip });
});

module.exports = router;


