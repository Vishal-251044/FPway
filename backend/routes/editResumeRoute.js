const express = require("express");
const { editResume } = require("../controllers/editResumeController");
const { upload } = require("../middlewares/cloudinary"); 

const router = express.Router();

router.post("/edit-resume", upload.single("resume"), editResume);

module.exports = router;
