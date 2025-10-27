import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import internshipRoutes from './routes/internshipRoutes.js';
import courseRoutes from "./routes/courseRoutes.js";

import authRoutes  from './routes/authRoutes.js';
import userRoutes  from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/company/internships", internshipRoutes);
app.use("/api/courses", courseRoutes); // for students
app.use("/api/company/courses", courseRoutes); 


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
