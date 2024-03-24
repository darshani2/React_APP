const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendVerificationEmail } = require('../emailService');
const { generateToken, secretKey } = require('../authUtils');
const {jwtDecode} = require('jwt-decode');
const MakeDon = require("../models/makedon");
const MakeReq = require("../models/makereq");

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
const getAllDonor = async (req, res) => {
  try {
    let isRequested = false;
    MakeDon.find({isRequested}).then((donors) => {
      res.status(200).send({ status: "donors fetched", donors });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot find" });
  }
};

const getAllSchool = async (req, res) => {
  try {
    MakeReq.find().then((schools) => {
      res.status(200).send({ status: "schools fetched", schools });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot find" });
  }
};

module.exports = { userRegister, userVerify, userLogin, generateToken, getAllDonor, getAllSchool };
