const Freelancer = require('../models/Freelancer');

exports.editFreelancerProfile = async (req, res) => {
  try {
    const { fullName, education } = req.body;
    let resume = req.file ? req.file.filename : req.body.resume; 

    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      req.params.id,
      { fullName, education, resume },
      { new: true }
    );

    if (!updatedFreelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }

    res.status(200).json(updatedFreelancer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
