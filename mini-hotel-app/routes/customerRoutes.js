const express = require('express');
const router = express.Router();
const { getAvailableRooms } = require('../controllers/customerController');

router.get('/available', getAvailableRooms);

module.exports = router;
