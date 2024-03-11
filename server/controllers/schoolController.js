const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const _ = requrie("lodash");
const axios = require("axios");
//const otpGenerator = require("otp-generator");
const User = require("../models/school");
const MakeReq = require("../models/makereq");
//const Otp = require("../models/otpModels");
const { sendVerificationEmail } = require("../emailService");
const { generateToken, secretKey } = require("../authUtils");
const { jwtDecode } = require("jwt-decode");

const userRegister = async (req, res) => {
  try {
    const path = req.originalUrl;
    console.log(path);
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

    sendVerificationEmail(
      newUser.email,
      verificationToken,
      `${userRole} Email Verification`,
      userRole
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
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

const addSchool = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const item = req.body.item;
    const quantity = Number(req.body.quantity);
    const location = req.body.location;
    const isRequested = true;

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
    let id = req.body.id;
    await MakeReq.findByIdAndDelete(id).then(() => {
      res.status(200).send({ status: "school deleted" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error with delete school" });
  }
};

const updateSchoolById = async (req, res) => {
  try {
    let id = req.body.id;
    const { name, email, phone, item, quantity, location } = req.body;

    const updateSchool = {
      name,
      email,
      phone,
      item,
      quantity,
      location,
    };
    const update = await MakeReq.findByIdAndUpdate(id, updateSchool).then(() => {
      res.status(200).send({ status: "User Updated" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error with updating school" });
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

};

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
