const express = require('express');
const multer = require('multer');
const { editFreelancerProfile } = require('../controllers/freelancerUpdateController.js');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Edit freelancer profile
router.put('/edit/:id', upload.single('resume'), editFreelancerProfile);

module.exports = router;
