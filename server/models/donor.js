const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verificationToken: String,
  isVerified: Boolean,
  role: String,
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
