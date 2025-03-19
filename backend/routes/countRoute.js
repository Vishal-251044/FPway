const express = require("express");
const { getApplicantCounts } = require("../controllers/countController");

const router = express.Router();

router.get("/applicant-counts", getApplicantCounts);

module.exports = router;
