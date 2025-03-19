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
const deleteProjectRoutes = require("./routes/deleteProjectRoute");
const projectGreenRoutes = require('./routes/projectGreenRoute');
const countRoutes = require("./routes/countRoute");
const editResumeRoute = require("./routes/editResumeRoute");
const scanRoutes = require("./routes/scanRoutes");

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
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
app.use("/api/projects", deleteProjectRoutes);
app.use('/api', projectGreenRoutes);
app.use("/api", countRoutes);
app.use("/api", editResumeRoute);
app.use("/api", scanRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
