// app_api/models/db.js
const mongoose = require("mongoose");

let dbURI = "mongodb://localhost/travlr";

// If you later move to Atlas or another URI, you can override with env var
if (process.env.MONGODB_URI) {
  dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helpful connection logs
mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Load API models
require("./trips");

