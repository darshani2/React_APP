const mongoose = require('mongoose');

const makereqSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  item: String,
  quantity: Number,
  location: String,
  isRequested: Boolean, 
});

const MakeReq = mongoose.model('Makereq', makereqSchema);

module.exports = MakeReq;
