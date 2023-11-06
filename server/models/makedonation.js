const mongoose = require('mongoose');

const makedonationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  NIC: String,
  typesOfItem: String,
  quantity: Number,
  location: String, 
});

const Makedonation = mongoose.model('makedonation', makedonationSchema);

module.exports = Makedonation;
