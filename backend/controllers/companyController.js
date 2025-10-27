const Internship = require('../models/Internship'); // create this model
const Course = require('../models/Course'); // create this model

// Add Internship
// backend/controllers/companyController.js
const addInternship = async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.status(201).json(internship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Add Course
const addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get company internships
const getCompanyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ companyId: req.body.companyId });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get company courses
const getCompanyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ companyId: req.body.companyId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addInternship, addCourse, getCompanyInternships, getCompanyCourses };
