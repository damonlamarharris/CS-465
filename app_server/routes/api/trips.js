// app_server/routes/api/trips.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Trip = mongoose.model("Trip");

// GET /api/trips  -> return all trips in JSON
router.get("/trips", async (req, res) => {
  try {
    const trips = await Trip.find().lean();
    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching trips" });
  }
});

module.exports = router;
