// app.js
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything in /public as static files
app.use(express.static(path.join(__dirname, "public")));

// Pretty routes that map to static files
app.get("/",        (_,res)=> res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/travel",  (_,res)=> res.sendFile(path.join(__dirname, "public", "travel.html")));
app.get("/login",   (_,res)=> res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/signup",  (_,res)=> res.sendFile(path.join(__dirname, "public", "signup.html")));
app.get("/admin",   (_,res)=> res.sendFile(path.join(__dirname, "public", "admin.html")));

// Simple input/output endpoint to verify server logic is working
// Example: /api/echo?q=beaches
app.get("/api/echo", (req, res) => {
  res.json({ ok: true, q: req.query.q ?? "" });
});

app.listen(PORT, () => {
  console.log(`Travlr running at http://localhost:${PORT}`);
});

