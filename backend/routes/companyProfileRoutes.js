const express = require('express');
const router = express.Router();
const { createProject, getProjectsByEmail } = require('../controllers/companyProfileController');

router.post('/projects', createProject);

router.get('/projects/:email', getProjectsByEmail);

module.exports = router;
