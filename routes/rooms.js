const express = require('express');
const { getAllRooms, createRoom } = require('../controllers/roomController');
const { islogged} = require('../middelwares/isloggedin');
const router = express.Router();

router.get('/list', islogged, getAllRooms);
router.post('/create', islogged, createRoom);

module.exports = router;
