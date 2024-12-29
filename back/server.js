const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
const profileRoutes = require('./routes/profileRoutes');
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const exploreRoutes = require('./routes/exploreRoutes');
const applyRoutes = require('./routes/applyRoutes');
const freelancerAppliedRoutes = require('./routes/freelancerAppliedRoutes');
const differentTitleRoutes = require("./routes/differentTitleRoutes");
const companyProfileRoutes = require('./routes/companyProfileRoutes');
const seeApplicantRoutes = require('./routes/seeApplicantRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FPway')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/freelancer', require('./routes/freelancerRoutes'));
app.use('/api/company', require('./routes/companyRoutes'));
app.use('/api', profileRoutes);
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use('/api', exploreRoutes);
app.use('/api', applyRoutes); 
app.use('/api', freelancerAppliedRoutes);
app.use("/api", differentTitleRoutes);
app.use('/api', companyProfileRoutes);
app.use('/api', seeApplicantRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
