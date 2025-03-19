const FreelancerProject = require("../models/FreelancerProject");

const getApplicantCounts = async (req, res) => {
  try {
    const counts = await FreelancerProject.aggregate([
      { $group: { _id: "$projectId", count: { $sum: 1 } } }
    ]);

    const result = {};
    counts.forEach(item => {
      result[item._id] = item.count;
    });

    res.json({ success: true, counts: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getApplicantCounts };
