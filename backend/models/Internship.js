// models/Internship.js
const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  activelyHiring: { type: Boolean, default: true },
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  companyWebsite: String,
  workType: { type: String, enum: ['Home', 'On-site', 'Both'], default: 'Home' },
  startImmediately: { type: Boolean, default: true },
  startDate: String,
  duration: String,
  stipend: String,
  applyEndDate: String,
  aboutCompany: String,
  aboutInternship: String,
  skillRequired: String,
  certificates: String,
  conditions: String,
  seats: Number,
  additionalInfo: String,
  companyId: { type: String, required: true }, // link to user (company)
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
