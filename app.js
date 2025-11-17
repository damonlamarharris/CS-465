// app.js
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

// --- MongoDB / Mongoose Setup ---
require("./app_server/models/db"); // connects to MongoDB and loads models

// --- View Engine Setup (Handlebars) ---
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "app_server", "views", "layouts"),
    partialsDir: path.join(__dirname, "app_server", "views", "partials"),
    helpers: { money: (v) => `$${Number(v).toLocaleString()}` },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "app_server", "views"));

// --- Middleware ---
// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form posts

// Basic CORS so Angular (or other clients) can call /api/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // you can tighten this later
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// --- Static Files ---
app.use(express.static(path.join(__dirname, "public")));

// --- Routers (require AFTER engine & db are configured) ---
const travelRouter = require("./app_server/routes/travel");
const reservationsRouter = require("./app_server/routes/reservations");
const authRouter = require("./app_server/routes/auth");
const adminRouter = require("./app_server/routes/admin");

// API router for trips (JSON via Mongoose)
const tripsApiRouter = require("./app_server/routes/api/trips");

// --- Routes ---

// Home
app.get("/", (req, res) => {
  res.render("index", { title: "Travlr Getaways" });
});

// Handle reservations form POST directly
app.post("/reservations", (req, res) => {
  const { destination, startDate, nights } = req.body;

  const confirmation = `Reservation received for ${
    destination || "your destination"
  } starting ${startDate || "your chosen date"} for ${
    nights || "0"
  } nights.`;

  // re-render the same reservations view with a confirmation message
  res.render("reservations", {
    title: "Reservations",
    confirmation,
    formData: req.body,
  });
});

// Use routers
app.use("/travel", travelRouter);
app.use("/reservations", reservationsRouter); // GET /reservations from router
app.use("/admin", adminRouter);               // /admin, /admin/trips, etc.
app.use("/", authRouter);                     // /login and /signup

// API routes (e.g., GET /api/trips)
app.use("/api", tripsApiRouter);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});

module.exports = app;

