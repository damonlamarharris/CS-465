// app_server/routes/admin.js
const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");

// GET /admin
router.get("/admin", admin.dashboard);

module.exports = router;
