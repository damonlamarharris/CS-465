// app_api/routes/index.js
const express = require("express");
const router = express.Router();

// express-jwt function
const { expressjwt: jwt } = require("express-jwt");

const tripsCtrl = require("../controllers/trips");
const ctrlAuth = require("../controllers/authentication");

// --- Simple logger for all /api requests ---
router.use((req, res, next) => {
  console.log(`API request: ${req.method} ${req.originalUrl}`);
  next();
});

// --- Quick health check for /api root ---
router.get("/", (req, res) => {
  return res.json({ message: "API root OK" });
});

// === JWT Auth Middleware ===
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload"
});

// === AUTH ROUTES ===
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

// === TRIP ROUTES ===
router.get("/trips", tripsCtrl.tripsList);
router.get("/trips/:tripCode", tripsCtrl.tripsReadOne);

// PROTECTED (JWT)
router.post("/trips", auth, tripsCtrl.tripsCreate);
router.put("/trips/:tripCode", auth, tripsCtrl.tripsUpdate);
router.delete("/trips/:tripCode", auth, tripsCtrl.tripsDelete);

// If nothing matched in /api, send JSON 404 (so we can see it)
router.use((req, res) => {
  return res.status(404).json({
    message: "API route not found",
    path: req.originalUrl
  });
});

module.exports = router;





