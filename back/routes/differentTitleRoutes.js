const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/differentTitleController");

router.post("/projects", createProject);

module.exports = router;
