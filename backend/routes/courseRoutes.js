import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// ✅ Create a new course
router.post("/", async (req, res) => {
  try {
    const { title, description, category, level, price, thumbnail, videoUrl, companyId } = req.body;

    if (!title || !description || !companyId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCourse = new Course({
      title,
      description,
      category,
      level,
      price,
      thumbnail,
      videoUrl,
      companyId,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Failed to create course" });
  }
});


// ✅ 1. Get all courses (for students)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("Error fetching all courses:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ 2. Get company-specific courses (for company dashboard)
router.get("/company", async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    const courses = await Course.find({ companyId });
    res.json(courses);
  } catch (err) {
    console.error("Error fetching company courses:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ message: "Failed to delete course" });
  }
});


export default router;
