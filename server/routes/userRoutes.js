const express = require('express');
const router = express.Router();
const authMiddleware = require('../controllers/authMiddleware');

router.post('/get-all-notification', authMiddleware.getAllNotificationController);


module.exports = router;