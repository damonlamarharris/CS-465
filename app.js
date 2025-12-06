// app.js
require("dotenv").config(); // Load environment variables from .env
console.log("JWT SECRET =", process.env.JWT_SECRET);

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3000;

// Warn if JWT secret is missing
if (!process.env.JWT_SECRET) {
  console.warn("WARNING: JWT_SECRET is not set. Check your .env file.");
}

// --- MongoDB Setup (API Models) ---
require("./app_api/models/db");

// --- Passport Auth Strategy ---
require("./app_api/config/passport");

// --- Handlebars View Engine ---
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "app_server", "views", "layouts"),
    partialsDir: path.join(__dirname, "app_server", "views", "partials"),
    helpers: { money: (v) => `$${Number(v).toLocaleString()}` }
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "app_server", "views"));

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// --- CORS (allows Angular & Postman) ---
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// --- Static Files ---
app.use(express.static(path.join(__dirname, "public")));

// --- MVC Server-Side Routes ---
const travelRouter = require("./app_server/routes/travel");
const reservationsRouter = require("./app_server/routes/reservations");
const authRouter = require("./app_server/routes/auth");
const adminRouter = require("./app_server/routes/admin");

app.use("/travel", travelRouter);
app.use("/reservations", reservationsRouter);
app.use("/admin", adminRouter);
app.use("/", authRouter); // login + logout pages

// --- API Routes ---
const apiRouter = require("./app_api/routes/index");

// Tiny logger so we see all /api hits
app.use("/api", (req, res, next) => {
  console.log("TOP-LEVEL /api HIT:", req.method, req.url);
  next();
}, apiRouter);

// --- JWT Unauthorized Handler ---
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: err.name + ": " + err.message });
  }
  next(err);
});

// --- 404 Page ---
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});

module.exports = app;





