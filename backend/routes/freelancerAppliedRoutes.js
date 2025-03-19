const express = require('express');
const router = express.Router();
const { getAppliedProjects } = require('../controllers/freelancerAppliedController');

router.get('/freelancer-applied', getAppliedProjects);

module.exports = router;
