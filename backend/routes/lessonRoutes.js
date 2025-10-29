import express from "express";
import Lesson from "../models/Lesson.js";
import upload from "../middleware/uploadMiddleware.js";
import path from "path";

const router = express.Router();

// ✅ Upload single video + multiple resource files
router.post("/upload", upload.fields([
  { name: "video", maxCount: 1 },
  { name: "resources", maxCount: 5 },
]), (req, res) => {
  try {
    const videoUrl = req.files["video"]
      ? `/uploads/lessons/${req.files["video"][0].filename}`
      : null;

    const resourceUrls = req.files["resources"]
      ? req.files["resources"].map((file) => `/uploads/lessons/${file.filename}`)
      : [];

    res.json({ videoUrl, resourceUrls });
  } catch (err) {
    console.error("Error uploading files:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ✅ Create a new lesson
router.post("/", async (req, res) => {
  try {
    const { courseId, title, description, videoUrl, resources } = req.body;
    const newLesson = new Lesson({
      courseId,
      title,
      description,
      videoUrl,
      resources,
    });
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    console.error("Error creating lesson:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all lessons for a course
router.get("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params; // ✅ get courseId from URL
    const lessons = await Lesson.find({ courseId });
    res.json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a lesson
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Lesson.findByIdAndDelete(id);
    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    console.error("Error deleting lesson:", err);
    res.status(500).json({ message: "Failed to delete lesson" });
  }
});

// ✅ Update lesson (supports text + optional files)
router.put(
  "/:id",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "resources", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const updateData = { title, description };

      // Handle optional video
      if (req.files && req.files["video"]) {
        updateData.videoUrl = `/uploads/lessons/${req.files["video"][0].filename}`;
      }

      // Handle optional resources
      if (req.files && req.files["resources"]) {
        updateData.resources = req.files["resources"].map(
          (file) => `/uploads/lessons/${file.filename}`
        );
      }

      const updatedLesson = await Lesson.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      res.json(updatedLesson);
    } catch (err) {
      console.error("Error updating lesson:", err);
      res.status(500).json({ message: "Failed to update lesson" });
    }
  }
);




export default router;
