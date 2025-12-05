// app_api/controllers/trips.js
const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");

// ===========================
// GET /api/trips  -> list all trips
// ===========================
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found" });
    }

    return res.status(200).json(trips);
  } catch (err) {
    console.error("tripsList error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ===========================
// GET /api/trips/:tripCode -> single trip
// ===========================
const tripsReadOne = async (req, res) => {
  const tripCode = req.params.tripCode;

  if (!tripCode) {
    return res.status(400).json({ message: "tripCode parameter is required" });
  }

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error("tripsReadOne error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ===========================
// POST /api/trips -> create a new trip
// ===========================
const tripsCreate = async (req, res) => {
  try {
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson // must match your schema!
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    console.error("tripsCreate error:", err);

    // Duplicate key (e.g., code already exists)
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "A trip with that code already exists." });
    }

    return res
      .status(400)
      .json({ message: "Trip creation failed", error: err });
  }
};

// ===========================
// PUT /api/trips/:tripCode -> update trip
// ===========================
const tripsUpdate = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const updated = await Trip.findOneAndUpdate(
      { code: tripCode },
      {
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson
      },
      { new: true }
    ).exec();

    if (!updated) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("tripsUpdate error:", err);
    return res.status(400).json({ message: "Trip update failed", error: err });
  }
};

// ===========================
// DELETE /api/trips/:tripCode -> remove a trip
// ===========================
const tripsDelete = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const deleted = await Trip.findOneAndDelete({ code: tripCode }).exec();

    if (!deleted) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(204).json(null);
  } catch (err) {
    console.error("tripsDelete error:", err);
    return res.status(400).json({ message: "Trip deletion failed", error: err });
  }
};

module.exports = {
  tripsList,
  tripsReadOne,
  tripsCreate,
  tripsUpdate,
  tripsDelete,
};
