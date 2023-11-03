const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/register', adminController.userRegister);
router.post('/verify', adminController.userVerify);
router.post('/login', adminController.userLogin);

module.exports = router;
