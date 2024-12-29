const express = require('express');
const { getProfile } = require('../controllers/profileController');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer configuration for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
  }
});

const upload = multer({ storage });

router.get('/profile/:email', getProfile);

router.post('/upload-resume', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  res.json({ resumePath: `/uploads/${req.file.filename}` });
});

module.exports = router;
