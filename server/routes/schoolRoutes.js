const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");

router.post("/register", schoolController.userRegister);
router.post("/verify", schoolController.userVerify);
router.post("/login", schoolController.userLogin);
router.post("/add", schoolController.addSchool);
router.get("/", schoolController.getAllSchool);
router.get("/get", schoolController.getSchoolByEmail);
router.put("/update", schoolController.updateSchoolById);
router.delete("/delete", schoolController.deleteSchoolById);

module.exports = router;
