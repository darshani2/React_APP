const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verificationToken: String,
  isVerified: Boolean,
  role: String,
  phone: Number,
  otp: Number
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
