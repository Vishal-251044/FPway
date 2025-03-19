const Freelancer = require("../models/Freelancer");
const { cloudinary } = require("../middlewares/cloudinary");

const editResume = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await Freelancer.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Freelancer not found" });
    }

    // Delete old resume from Cloudinary
    if (user.resume) {
      const resumePublicId = user.resume.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`resumes/${resumePublicId}`, { resource_type: "raw" });
    }

    // Update user resume in database
    user.resume = req.file.path;
    await user.save();

    res.json({ success: true, message: "Resume updated successfully", resume: req.file.path });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { editResume };
