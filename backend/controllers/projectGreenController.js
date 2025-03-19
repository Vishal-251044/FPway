const FreelancerProject = require('../models/FreelancerProject');

exports.getAppliedProjects = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const appliedProjects = await FreelancerProject.find({ email }).select('projectId');
    res.json(appliedProjects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
