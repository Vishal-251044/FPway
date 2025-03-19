const express = require("express");
const router = express.Router();

const scanResume = async (req, res) => {
    console.log("📥 Received scan request:", req.body);

    if (!req.body || typeof req.body !== "object") {
        console.error("❌ Invalid request format:", req.body);
        return res.status(400).json({ success: false, message: "Invalid request format" });
    }

    const { resumeUrl, projectId, email } = req.body;

    console.log("🔍 Extracted fields:", { resumeUrl, projectId, email });

    if (!resumeUrl || !projectId || !email) {
        console.error("❌ Missing required fields:", { resumeUrl, projectId, email });
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Simulate NLP resume comparison (replace with real NLP logic)
        const matchPercentage = Math.floor(Math.random() * 101); // Simulating a random match

        console.log(`✅ Resume scan successful for ${email} | Match: ${matchPercentage}%`);

        return res.json({
            success: true,
            message: "Resume scanned successfully",
            matchPercentage,
        });
    } catch (error) {
        console.error("❌ Error scanning resume:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { scanResume };
