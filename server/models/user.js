const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verificationToken: String,
  isVerified: Boolean,
  role: String,
});

const User = mongoose.model('Admin', userSchema);

module.exports = User;
