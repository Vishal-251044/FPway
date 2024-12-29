const express = require('express');
const router = express.Router();
const { registerFreelancer, loginFreelancer } = require('../controllers/freelancerController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('resume'), registerFreelancer);
router.post('/login', loginFreelancer);

module.exports = router;
