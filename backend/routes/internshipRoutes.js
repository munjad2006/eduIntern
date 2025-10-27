import express from "express";
import Internship from "../models/Internship.js";

const router = express.Router();

// POST - add internship
router.post("/", async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.status(201).json(internship);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create internship" });
  }
});

// GET - all internships (students)
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: "Error fetching internships" });
  }
});

// GET - company internships
router.get("/company", async (req, res) => {
  try {
    const { companyId } = req.query;
    const internships = await Internship.find({ companyId });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - internship by ID
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
