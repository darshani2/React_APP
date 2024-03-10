const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const _ = requrie("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const User = require('../models/school');
const Otp = require('../models/otpModels');
const { sendVerificationEmail } = require('../emailService');
const { generateToken, secretKey } = require('../authUtils');
const {jwtDecode} = require('jwt-decode');

const userRegister = async (req, res) => {
  try {
    const path = req.originalUrl;
    console.log(path)
    let userRole;

    if (path.includes('admin')) {
        userRole = 'admin';
      } else if (path.includes('donor')) {
        userRole = 'donor';
      } else if (path.includes('school')) {
        userRole = 'school';
      } else {
        return res.status(400).json({ message: 'Invalid registration route' });
    }

    const { name, email, password } = req.body;

    const verificationToken = generateToken(email, userRole);
    console.log(verificationToken);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      role: userRole,
    });

    await newUser.save();

    sendVerificationEmail(newUser.email, verificationToken, `${userRole} Email Verification`, userRole);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

const userVerify = async (req, res) => {
  const token = req.query.token;
  console.log(token);
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const userEmail = decodedToken.data.email;
    console.log(userEmail);
    const user = await User.findOne({ email: userEmail });
    if (user) {
      user.isVerified = true;
      await user.save();
      res.status(200).json({ message: 'Email verified successfully' });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Email verification failed' });
  }
};


  const userLogin = (request, response) => {
    User.findOne({ email: request.body.email })
      .then((user) => {
        bcrypt
          .compare(request.body.password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return response.status(400).send({
                message: 'Passwords do not match',
                error,
              });
            }
              const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              secretKey,
              { expiresIn: '24h' }
            );
              response.status(200).send({
              message: 'Login Successful',
              email: user.email,
              token,
            });
          })
          .catch((error) => {
            response.status(400).send({
              message: 'Passwords do not match',
              error,
            });
          });
      })
      .catch((e) => {
        response.status(404).send({
          message: 'Email not found',
          e,
        });
      });
  };


module.exports = { userRegister, userVerify, userLogin, generateToken };


/* 
module.exports.signUp = async(req, res) =>{
  const user = await User.findOne({
    number : req.body.number
  });
  if(user) return res.status(400).send("User already registered!");
}
Module.exports.verifyOtp = async(req, res) =>{
 digits: true, alphabets : true, upperCase : false, specialCharts : false

});
const number = req.body.number;
console.log(OTP);

const otp = new Otp({number: number, otp: OTP});
const salt = await bctypt.genSalt(10)
otp.otp = await bcrypt.hash(otp.otp, salt);
const result = await otp.save();
return res.status(200).send("Otp send successfully!");
}
module.exports.verifyOtp = async(req, res) =>{
  const otpHolder = await Otp.find({
    number: req.body.number
  });

  if (otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!");
  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

  if(rightOtppFind.number === req.body.number && validUser){
    const user = new User(_.pick(req.body, ["number"]));
    const token = user.generateJWT();
    const result = await user.save();
    const OTPDelete = await Otp.deleteMany({
      number: rightOtpFind.number
    });

    return res.status(200).send9{
      message: "User Registration Successfull!",
      token : token,
      data : result
    });
  } else{
    return res.status(400).send("Your OTP was wrong")
  }
}


*/
