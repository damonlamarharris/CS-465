// app_server/routes/auth.js
const express = require("express");
const router = express.Router();

// --- LOGIN ---
router.get("/login", (req, res) => {
  res.render("login.hbs", { title: "Login" });
});

router.post("/login", (req, res) => {
  // TODO: add authentication logic later
  console.log("Login attempt:", req.body);
  res.redirect("/");
});

// --- SIGNUP ---
router.get("/signup", (req, res) => {
  res.render("signup.hbs", { title: "Create Account" });
});

router.post("/signup", (req, res) => {
  // TODO: add user creation logic later
  console.log("Signup attempt:", req.body);
  res.redirect("/login");
});

// --- LOGOUT ---
router.get("/logout", (req, res) => {
  // TODO: clear session or cookies when implemented
  res.redirect("/");
});

module.exports = router;
