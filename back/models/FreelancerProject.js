const mongoose = require('mongoose');

const FreelancerProjectSchema = new mongoose.Schema({
  email: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' },
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  skills: { type: String, required: true },
  description: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FreelancerProject', FreelancerProjectSchema);
