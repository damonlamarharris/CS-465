// app_api/models/trips.js
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true },          // e.g. "ROME2025"
  name: { type: String, required: true },          // e.g. "Rome, Italy"
  length: { type: Number, required: true },        // # of days
  start: { type: Date, required: true },           // start date
  resort: { type: String, required: true },        // hotel / resort name
  perPerson: { type: Number, required: true, min: 0 }, // price per person
  image: { type: String },                         // filename or URL
  description: { type: String },
});

// 3rd argument "trips" = MongoDB collection name
mongoose.model("Trip", tripSchema, "trips");


