const mongoose = require("mongoose");

const makedonSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  item: String,
  quantity: Number,
  location: String,
  isRequested: Boolean,
});

const MakeDon = mongoose.model("Makedon", makedonSchema);

module.exports = MakeDon;
