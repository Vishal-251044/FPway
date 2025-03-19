const Project = require("../models/Project");

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { deleteProject };
