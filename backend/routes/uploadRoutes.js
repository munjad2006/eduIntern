// backend/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    // safe filename: timestamp + original name
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  },
});

// Accept only images and videos
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|mp4|mov|webm/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("File type not allowed"), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 200 * 1024 * 1024 } }); // 200MB

// POST /api/upload/image  -> field name "file"
router.post("/image", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });
  res.json({ fileUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` });
});

// POST /api/upload/file  -> field name "file" (for videos or other files)
router.post("/file", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ fileUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` });
});

export default router;
