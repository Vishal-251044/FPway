const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { title, companyName, skills, description, email } = req.body;

  try {
    const existingProject = await Project.findOne({ title, email });

    if (existingProject) {
      return res.status(400).json({ success: false, message: "Project with this title already exists" });
    }

    const project = new Project({ title, companyName, skills, description, email });
    await project.save();

    res.status(201).json({ success: true, message: "Project created successfully" });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
