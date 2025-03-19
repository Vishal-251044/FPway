const express = require('express');
const { getAllProjects } = require('../controllers/exploreController.js');
const router = express.Router();

router.get('/projects', getAllProjects);

module.exports = router;
