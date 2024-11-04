const Booking = require('../models/bookings');

exports.createBooking = async (req, res) => {
  const { roomID, checkInDate, checkOutDate } = req.body;
  const booking = new Booking({
    customerID: req.user._id,
    roomID,
    checkInDate,
    checkOutDate,
    Status: 'pending',
  });
  await booking.save();
  res.status(201).json(booking);
};

exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('room');
  res.json(bookings);
};

