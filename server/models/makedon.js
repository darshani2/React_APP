const mongoose = require('mongoose');

const makedonSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  item: String,
  quantity: Number,
  location: String, 
});

const MakeDon = mongoose.model('makedon', makedonSchema);

module.exports = MakeDon;
