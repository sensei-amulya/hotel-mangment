const express= require('express')
const{islogged}= require('../middelwares/isloggedin')
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingcontroller');

router.post('/room/book', islogged, createBooking);
router.get('/booking/list', islogged, getUserBookings);

module.exports = router;
