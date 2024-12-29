const express = require('express');
const router = express.Router();
const { getApplicantsByProjectId } = require('../controllers/seeApplicantController');

router.get('/applicants/:projectId', getApplicantsByProjectId);

module.exports = router;
