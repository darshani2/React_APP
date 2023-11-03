const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.post('/register', schoolController.userRegister);
router.post('/verify', schoolController.userVerify);
router.post('/login', schoolController.userLogin);

module.exports = router;
