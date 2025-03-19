const express = require("express");
const { getProfile } = require("../controllers/profileController");
const { upload } = require("../middlewares/cloudinary"); 
const router = express.Router();

router.get("/profile/:email", getProfile);

// Upload resume to Cloudinary
router.post("/upload-resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ resumePath: req.file.path }); 
});

module.exports = router;
