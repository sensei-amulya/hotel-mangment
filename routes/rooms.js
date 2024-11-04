const express = require('express');
const { getAllRooms, createRoom } = require('../controllers/roomController');
const { isloggedin} = require('../middelwares/isloggedin');
const router = express.Router();

router.get('/', isloggedin, getAllRooms);
router.post('/', isloggedin, createRoom);

module.exports = router;
