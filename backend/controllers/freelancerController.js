const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Freelancer = require('../models/Freelancer');
const Company = require('../models/Company'); 

const registerFreelancer = async (req, res) => {
  const { fullName, education, email, password } = req.body;
  
  try {
    let freelancer = await Freelancer.findOne({ email });
    let company = await Company.findOne({ email });

    if (freelancer || company) {
      return res.status(400).json({ message: "Email already exists in another account" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Get Cloudinary PDF URL
    const resumeUrl = req.file ? req.file.path : null; 

    freelancer = new Freelancer({
      fullName,
      education,
      email,
      password: hashedPassword,
      resume: resumeUrl, 
    });

    await freelancer.save();
    res.status(201).json({ message: "Freelancer registered successfully", resumeUrl });
  } catch (error) {
    console.error("Error during freelancer registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginFreelancer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const freelancer = await Freelancer.findOne({ email });
    if (!freelancer) return res.status(400).json({ message: "Freelancer not found" });

    const isMatch = await bcrypt.compare(password, freelancer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ freelancerId: freelancer.id }, 'secret', { expiresIn: '1h' });
    res.json({ token, message: "Freelancer logged in successfully" });
  } catch (error) {
    console.error("Error during freelancer login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerFreelancer, loginFreelancer };
