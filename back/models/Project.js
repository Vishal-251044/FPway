const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  skills: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

projectSchema.index({ title: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Project", projectSchema);
