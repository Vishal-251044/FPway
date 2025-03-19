const Contact = require("../models/Contact");

exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to submit the form" });
  }
};
