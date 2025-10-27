const express = require('express');
const router = express.Router();
const { addInternship, addCourse, getCompanyInternships, getCompanyCourses } = require('../controllers/companyController');

// Internships
router.post('/internships', addInternship);
router.get('/internships', getCompanyInternships);

// Courses
router.post('/courses', addCourse);
router.get('/courses', getCompanyCourses);

module.exports = router;
