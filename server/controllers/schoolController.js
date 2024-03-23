const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/school");
const MakeReq = require("../models/makereq");
const { sendVerificationEmail } = require("../emailService");
const { generateToken, secretKey } = require("../authUtils");
const { jwtDecode } = require("jwt-decode");
const otpGenerator = require("otp-generator");

const userRegister = async (req, res) => {
  try {
    const path = req.originalUrl;
    // console.log(path);
    let userRole;

    if (path.includes("admin")) {
      userRole = "admin";
    } else if (path.includes("donor")) {
      userRole = "donor";
    } else if (path.includes("school")) {
      userRole = "school";
    } else {
      return res.status(400).json({ message: "Invalid registration route" });
    }

    const { name, email, password, number } = req.body;

    const verificationToken = generateToken(email, userRole);
    const OTP = generateNumericOTP(6); // Generate OTP
    console.log("Generated OTP : " + OTP);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      role: userRole,
      phone: number,
      otp: OTP
    });

    const savedUser = await newUser.save();

    sendVerificationEmail(
      newUser.email,
      verificationToken,
      `${userRole} Email Verification`,
      userRole
    );

    res.status(201).json({ message: "User registered successfully", userId: savedUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

function generateNumericOTP(length) {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]; // Randomly select a digit from 0 to 9
  }
  return OTP;
}

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
      res.status(200).json({ message: "Email verified successfully" });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Email verification failed" });
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
              message: "Passwords do not match",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            secretKey,
            { expiresIn: "24h" }
          );
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords do not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
};

const otp = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const userId = req.body.userId;

    // Retrieve the user from the database using the userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    // Compare the OTPs
    if (otp === user.otp) {
      // Correct OTP, send 200 response
      return res.status(200).json({ message: "OTP verification successful" });
    } else {
      // Incorrect OTP, send 500 response
      return res.status(500).json({ message: "Incorrect OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Incorrect OTP" });
  }
};

const addSchool = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const item = req.body.item;
    const quantity = Number(req.body.quantity);
    const location = req.body.location;
    const isRequested = false;

    const newRequest = new MakeReq({
      name,
      email,
      phone,
      item,
      quantity,
      location,
      isRequested,
    });

    //when the request is success (response from json format)
    newRequest.save().then(() => {
      res.json("Request added");
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const getAllSchool = async (req, res) => {
  try {
    MakeReq.find().then((schools) => {
      res.json(schools);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot find" });
  }
};

const getSchoolByEmail = async (req, res) => {
  try {
    let email = req.query.email;
    const user = await MakeReq.find({ email }).then((schools) => {
      res.status(200).send({ status: "schools fetched", schools });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error with get school" });
  }
};

const deleteSchoolById = async (req, res) => {
  try {
    let id = req.query.id;
    await MakeReq.findByIdAndDelete(id).then(() => {
      res.status(200).send({ status: "requester deleted" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error with delete donor" });
  }
};

const updateSchoolById = async (req, res) => {
  try {
    const { id, name, email, phone, item, quantity, location } = req.body;
    let isRequested = false;
    const updateSchool = {
      name,
      email,
      phone,
      item,
      quantity,
      location,
      isRequested
    };
    // // Use findByIdAndUpdate to find the document by _id and update it
    const updatedSchool = await MakeReq.findByIdAndUpdate(id, updateSchool, { new: true });

    if (!updatedSchool) {
      return res.status(404).send({ status: "No document found to update" });
    }
    res.status(200).send({ status: "User Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error with updating requester" });
  }
};

module.exports = {
  userRegister,
  userVerify,
  userLogin,
  generateToken,
  addSchool,
  getAllSchool,
  getSchoolByEmail,
  deleteSchoolById,
  updateSchoolById,
  otp
};

