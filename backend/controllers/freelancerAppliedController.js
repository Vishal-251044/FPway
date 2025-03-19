const FreelancerProject = require('../models/FreelancerProject');

exports.getAppliedProjects = async (req, res) => {
  const { email } = req.query;

  try {
    const appliedProjects = await FreelancerProject.find({ email });
    res.status(200).json({ appliedProjects });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving applied projects', error });
  }
};
