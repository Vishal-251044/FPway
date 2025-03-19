const Freelancer = require("../models/Freelancer");
const Company = require("../models/Company");

const getProfile = async (req, res) => {
  const email = req.params.email;

  try {
    let user = await Freelancer.findOne({ email });

    if (user) {
      return res.status(200).json({
        userType: "freelancer",
        fullName: user.fullName,
        education: user.education,
        email: user.email,
        resume: user.resume, 
      });
    }

    user = await Company.findOne({ email });
    if (user) {
      return res.status(200).json({
        userType: "company",
        name: user.name,
        email: user.email,
      });
    }

    res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
