const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true },
  roomID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', required: true },
  checkInDate: { 
     type: Date,
     required: true },
  checkOutDate: { 
    type: Date,
    required: true },
  status: { 
    type: String, 
    enum: ['Reserved', 'Checked-In', 'Checked-Out'], default: 'Reserved' }
});

module.exports = mongoose.model('Booking', bookingSchema);
