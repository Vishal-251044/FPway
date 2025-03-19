const express = require("express");
const { deleteProject } = require("../controllers/deleteProjectController");

const router = express.Router();

router.delete("/delete/:projectId", deleteProject);

module.exports = router;
