const express = require('express');
const router = express.Router();
const { getAppliedProjects } = require('../controllers/projectGreenController');

router.get('/applied-projects', getAppliedProjects);

module.exports = router;
