const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.post('/register', donorController.userRegister);
router.post('/verify', donorController.userVerify);
router.post('/login', donorController.userLogin);

module.exports = router;

