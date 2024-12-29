// routes/applyRoutes.js
const express = require('express');
const router = express.Router();
const { applyForProject } = require('../controllers/applyController');

router.post('/apply', applyForProject);

module.exports = router;
