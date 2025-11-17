// app_server/models/trip.js
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
    min: 1,
  },
  start: {
    type: Date,
    required: true,
  },
  resort: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

mongoose.model("Trip", tripSchema);
