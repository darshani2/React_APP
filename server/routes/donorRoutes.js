const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");

router.post("/register", donorController.userRegister);
router.post("/verify", donorController.userVerify);
router.post("/login", donorController.userLogin);
router.post("/add", donorController.addDonor);
router.get("/", donorController.getAllDonor);
// router.post("/get", donorController.getDonor);
// router.post("/update", donorController.updateDonor);
// router.post("/delete", donorController.deleteDonor);

module.exports = router;
