const Project = require('../models/Project');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 }); 
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

module.exports = { getAllProjects };
