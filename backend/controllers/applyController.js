const Freelancer = require('../models/Freelancer');
const FreelancerProject = require('../models/FreelancerProject');

exports.applyForProject = async (req, res) => {
  const { email, projectId, title, companyName, skills, description } = req.body;

  try {
    const freelancer = await Freelancer.findOne({ email });
    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found.' });
    }

    const existingApplication = await FreelancerProject.findOne({ email, projectId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this project.' });
    }

    const newApplication = new FreelancerProject({
      email,
      projectId,
      title,
      companyName,
      skills,
      description,
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error applying for project.', error });
  }
};
