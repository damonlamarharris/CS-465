// app_api/controllers/trips.js
const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");

// GET /api/trips  -> list all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();      // Mongoose FIND

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found" });
    }

    return res.status(200).json(trips);          // collection of trips as JSON
  } catch (err) {
    console.error("tripsList error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/trips/:tripCode  -> single trip by code
const tripsReadOne = async (req, res) => {
  const tripCode = req.params.tripCode;

  if (!tripCode) {
    return res.status(400).json({ message: "tripCode parameter is required" });
  }

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec(); // FIND one by code

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(trip);           // individual trip as JSON
  } catch (err) {
    console.error("tripsReadOne error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  tripsList,
  tripsReadOne,
};
