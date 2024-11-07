import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    imageUrl: { type: String, default: null },
    chapter: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      title: { type: String, required: true },
      description: { type: String, default: null },
      videoUrl: { type: String, default: null },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
