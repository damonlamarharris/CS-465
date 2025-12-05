// app_api/routes/index.js
const express = require("express");
const router = express.Router();
const tripsCtrl = require("../controllers/trips");

// === TRIP ROUTES ===

// GET /api/trips  -> list all trips
router.get("/trips", tripsCtrl.tripsList);

// POST /api/trips -> create a new trip
router.post("/trips", tripsCtrl.tripsCreate);

// GET /api/trips/:tripCode -> read one trip
router.get("/trips/:tripCode", tripsCtrl.tripsReadOne);

// PUT /api/trips/:tripCode -> update a trip
router.put("/trips/:tripCode", tripsCtrl.tripsUpdate);

// DELETE /api/trips/:tripCode -> delete a trip
router.delete("/trips/:tripCode", tripsCtrl.tripsDelete);

module.exports = router;

