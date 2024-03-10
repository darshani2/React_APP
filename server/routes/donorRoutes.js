const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");

router.post("/register", donorController.userRegister);
router.post("/verify", donorController.userVerify);
router.post("/login", donorController.userLogin);
router.post("/add", donorController.addDonor);
router.get("/", donorController.getAllDonor);
router.get("/get", donorController.getDonorByEmail);
router.put("/update", donorController.updateDonorById);
router.delete("/delete", donorController.deleteDonorById);

module.exports = router;
