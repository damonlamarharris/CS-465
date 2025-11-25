// app.js
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

// --- MongoDB / Mongoose Setup (API DB Layer) ---
require("./app_api/models/db"); 
// This now loads the correct API-side database models (Module 5 requirement)

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for allowing Angular or external clients to access /api endpoints
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
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

// --- MVC Routers (Server-Side Web App) ---
const travelRouter = require("./app_server/routes/travel");
const reservationsRouter = require("./app_server/routes/reservations");
const authRouter = require("./app_server/routes/auth");
const adminRouter = require("./app_server/routes/admin");

// --- REST API Router (Module 5) ---
const apiRouter = require("./app_api/routes/index");

// --- Routes ---

// Home
app.get("/", (req, res) => {
  res.render("index", { title: "Travlr Getaways" });
});

// Reservations form POST (direct)
app.post("/reservations", (req, res) => {
  const { destination, startDate, nights } = req.body;

  const confirmation = `Reservation received for ${
    destination || "your destination"
  } starting ${startDate || "your chosen date"} for ${
    nights || "0"
  } nights.`;

  res.render("reservations", {
    title: "Reservations",
    confirmation,
    formData: req.body,
  });
});

// MVC Route Usage
app.use("/travel", travelRouter);
app.use("/reservations", reservationsRouter);
app.use("/admin", adminRouter);
app.use("/", authRouter); // login/signup

// --- API Routes (JSON only) ---
app.use("/api", apiRouter);
// Example: GET http://localhost:3000/api/trips

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// --- Start Server ---
app.listen(PORT, () =>
  console.log(`Travlr Getaways running at http://localhost:${PORT}`)
);

module.exports = app;

