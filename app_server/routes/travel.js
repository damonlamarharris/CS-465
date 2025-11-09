// app_server/routes/travel.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/travelers');

router.get('/', ctrl.home);
router.get('/travel', ctrl.travelList);

module.exports = router;

