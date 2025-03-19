const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for PDFs
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    format: async (req, file) => "pdf", // Ensure it's always stored as a PDF
    resource_type: "raw", // For non-image files like PDFs
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
