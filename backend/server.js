import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from "path";
import fs from "fs";


import internshipRoutes from './routes/internshipRoutes.js';
import courseRoutes from "./routes/courseRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";

import authRoutes  from './routes/authRoutes.js';
import userRoutes  from './routes/userRoutes.js';


const uploadDir = "uploads/lessons";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/company/internships", internshipRoutes);
app.use("/api/courses", courseRoutes); // for students
app.use("/api/company/courses", courseRoutes); 

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/upload", uploadRoutes);
app.use("/api/lessons", lessonRoutes);


// Root route
app.get('/', (req, res) => {
  res.send('Backend is working 🚀');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
