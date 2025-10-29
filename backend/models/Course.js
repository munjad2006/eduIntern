import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  moduleTitle: String,
  description: String,
  hasVideo: Boolean,
  hasQuiz: Boolean,
  hasAssignment: Boolean,
  hasTest: Boolean,
});

const courseSchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    level: { type: String },
    price: { type: Number, default: 0 },
    thumbnail: { type: String },
    videoUrl: { type: String },
    duration: { type: String },
    topics: [String],
    certificate: { type: String },
    whyLearn: { type: String },
    trainingMode: [String], // e.g., ["Video", "Quiz", "Assignment"]
    modules: [syllabusSchema],
    reviews: [
      {
        userId: String,
        userName: String,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
