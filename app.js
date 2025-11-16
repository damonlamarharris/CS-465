// app.js
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(express.urlencoded({ extended: true })); // for form posts

// --- Static Files ---
app.use(express.static(path.join(__dirname, "public")));

// --- Routers (require AFTER engine is configured) ---
const travelRouter = require("./app_server/routes/travel");
const reservationsRouter = require("./app_server/routes/reservations");
const authRouter = require("./app_server/routes/auth");
const adminRouter = require("./app_server/routes/admin"); // NEW

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
app.use("/admin", adminRouter);               // NEW: /admin, /admin/trips, etc.
app.use("/", authRouter);                     // /login and /signup

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});

module.exports = app;









