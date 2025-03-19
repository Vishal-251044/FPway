const mongoose = require("mongoose");

const FreelancerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  education: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resume: { type: String }, 
});

module.exports = mongoose.model("Freelancer", FreelancerSchema);
