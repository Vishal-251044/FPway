const FreelancerProject = require('../models/FreelancerProject');
const Freelancer = require('../models/Freelancer');

exports.getApplicantsByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const applicants = await FreelancerProject.find({ projectId }).populate({
      path: 'projectId',
      select: 'title companyName'
    });

    const applicantDetails = await Promise.all(
      applicants.map(async (applicant) => {
        const freelancer = await Freelancer.findOne({ email: applicant.email });
        return {
          fullName: freelancer.fullName,
          education: freelancer.education,
          resume: freelancer.resume
        };
      })
    );

    res.json({ success: true, applicants: applicantDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching applicants" });
  }
};
