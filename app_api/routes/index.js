// app_api/routes/index.js
const express = require("express");
const router = express.Router();
const tripsCtrl = require("../controllers/trips");

// GET /api/trips        -> all trips
router.get("/trips", tripsCtrl.tripsList);

// GET /api/trips/:tripCode   -> one trip by code
router.get("/trips/:tripCode", tripsCtrl.tripsReadOne);

module.exports = router;
