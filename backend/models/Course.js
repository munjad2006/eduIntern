// backend/models/Course.js
const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
  moduleTitle: String,
  description: String,
  hasVideo: Boolean,
  hasQuiz: Boolean,
  hasAssignment: Boolean,
  hasTest: Boolean,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  topics: [String],
  certificate: String,
  whyLearn: String,
  trainingMode: [String], // e.g., ["Video", "Quiz", "Assignment"]
  modules: Array,
  companyId: String,
});



module.exports = mongoose.model('Course', courseSchema);

