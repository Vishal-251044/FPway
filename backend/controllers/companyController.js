const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company'); 
const Freelancer = require('../models/Freelancer'); 

const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let company = await Company.findOne({ email });
    let freelancer = await Freelancer.findOne({ email });

    if (company || freelancer) {
      return res.status(400).json({ message: "Email already exists in another account" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    company = new Company({ name, email, password: hashedPassword });

    await company.save();
    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error during company registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(400).json({ message: "Company not found" });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ companyId: company.id }, 'secret', { expiresIn: '1h' });
    res.json({ token, message: "Company logged in successfully" });
  } catch (error) {
    console.error("Error during company login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerCompany, loginCompany };
