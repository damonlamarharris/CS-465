// app_server/routes/reservations.js
const express = require("express");
const router = express.Router();

// Basic reservations page
router.get("/", (req, res) => {
  res.render("reservations", { title: "Reservations" });
});

// Example: POST handler later when you add a form
// router.post("/", (req, res) => { /* save reservation */ });

module.exports = router;
