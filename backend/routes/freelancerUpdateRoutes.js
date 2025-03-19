const express = require("express");
const router = express.Router();
const { editFreelancerProfile } = require("../controllers/freelancerUpdateController");
const { upload } = require("../middlewares/cloudinary"); 

router.put("/edit/:id", upload.single("resume"), editFreelancerProfile);

module.exports = router;
