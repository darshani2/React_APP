const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secretKey = crypto.randomBytes(64).toString('hex');

const generateToken = (email, role) => {
  const tokenData = {
    email: email,
    role: role,
  };
  const token = jwt.sign({ data: tokenData }, secretKey, { expiresIn: '1h' });
  return token;
};

module.exports = { generateToken, secretKey };
