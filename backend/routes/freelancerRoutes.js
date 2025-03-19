const express = require("express");
const router = express.Router();
const { registerFreelancer, loginFreelancer } = require("../controllers/freelancerController");
const { upload } = require("../middlewares/cloudinary"); 

router.post("/register", upload.single("resume"), registerFreelancer);
router.post("/login", loginFreelancer);

module.exports = router;
