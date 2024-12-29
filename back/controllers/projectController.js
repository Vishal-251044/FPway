const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { title, companyName, skills, description, email } = req.body;

    const project = new Project({ title, companyName, skills, description, email });
    await project.save();

    res.json({ success: true, message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create project" });
  }
};
