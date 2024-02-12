const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schoolSchema = new mongoose.Schema({
  name: String,
  email: String,
  // password: String,
  phone_num : String,
  verificationToken: String,
  isVerified: Boolean,
  role: String,
}, {timestamps : true}
);

schoolSchema.methods.generateJWT = function(){
  const token = jwt.sign({
    _id : this._id,
    number : this.number
  }, process.env.JWT_SECRET_KEY, {expireIn : "7d"})
  return token
}
const School = mongoose.model('School', schoolSchema);

module.exports = School;
