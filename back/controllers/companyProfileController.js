const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, companyName, skills, description, email } = req.body;
    const newProject = new Project({
      title,
      companyName,
      skills,
      description,
      email,
    });

    await newProject.save();
    res.status(201).json({ success: true, message: 'Project created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Project with this title already exists' });
    } else {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  }
};

exports.getProjectsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const projects = await Project.find({ email });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
