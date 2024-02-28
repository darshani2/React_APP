const mongoose = require('mongoose');

const makereqSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  item: String,
  quantity: Number,
  location: String, 
});

const MakeReq = mongoose.model('makereq', makereqSchema);

module.exports = MakeReq;
