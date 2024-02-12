const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {jwtDecode} = require('jwt-decode');

const getAllNotificationController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      const seennotification = user.seennotification;
      const notifcation = user.notifcation;
      seennotification.push(...notifcation);
      user.notifcation = [];
      user.seennotification = notifcation;
      const updatedUser = await user.save();
      res.status(200).send({
        success: true,
        message: "all notification marked as read",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  };
  
  module.exports = {
    
    getAllNotificationController,
  };
  