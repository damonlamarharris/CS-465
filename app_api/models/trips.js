// app_api/models/trips.js
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true },      // e.g. "ROME001"
  name: { type: String, required: true },      // e.g. "Weekend in Rome"
  length: { type: Number, required: true },    // number of days
  start: { type: Date, required: true },       // start date
  resort: { type: String },
  perPerson: { type: Number },                 // price per person
  image: { type: String },                     // image filename or URL
  description: { type: String },
});

mongoose.model("Trip", tripSchema, "trips");

