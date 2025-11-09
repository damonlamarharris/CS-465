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
  })
);

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "app_server", "views"));

// --- Middleware ---
app.use(express.static(path.join(__dirname, "public")));

// --- Routes ---
const travelRouter = require("./app_server/routes/travel");
const authRouter   = require("./app_server/routes/auth");
const adminRouter  = require("./app_server/routes/admin");

app.use("/", travelRouter);
app.use("/", authRouter);
app.use("/", adminRouter);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Travlr running at http://localhost:${PORT}`);
});

module.exports = app;

