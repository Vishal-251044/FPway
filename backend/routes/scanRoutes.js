const express = require("express");
const router = express.Router();
const { scanResume } = require("../controllers/scanController");

router.post("/scan-resume", scanResume);

module.exports = router;
