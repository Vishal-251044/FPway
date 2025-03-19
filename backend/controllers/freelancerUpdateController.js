const Freelancer = require("../models/Freelancer");
const { cloudinary } = require("../middlewares/cloudinary"); 

exports.editFreelancerProfile = async (req, res) => {
  try {
    const { fullName, education } = req.body;
    let resume = req.body.resume; 

    // Upload new resume to Cloudinary if a file is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "resumes",
        resource_type: "raw", 
      });
      resume = result.secure_url; 
    }

    // Update the freelancer profile in the database
    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      req.params.id,
      { fullName, education, resume },
      { new: true }
    );

    if (!updatedFreelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", freelancer: updatedFreelancer });
  } catch (error) {
    console.error("Error updating freelancer profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
