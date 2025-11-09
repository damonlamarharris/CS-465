// app_server/routes/auth.js
const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.get('/login', auth.loginForm);
router.post('/login', auth.doLogin);
router.get('/logout', auth.logout);

// signup
router.get("/signup", auth.signupForm);
router.post("/signup", auth.doSignup);

// logout
router.get("/logout", (req, res) => res.redirect("/"));

module.exports = router;
