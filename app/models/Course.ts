import mongoose, { Document, Schema } from "mongoose";

// Default values
const DEFAULT_NULL = null;

// Chapter interface
export interface IChapter {
  id: mongoose.Types.ObjectId;
  title: string;
  description?: string | null;
  videoUrl?: string | null;
}

// Course interface
export interface ICourse extends Document {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  chapter: IChapter;
  createdAt?: Date;
  updatedAt?: Date;
}

// Chapter schema definition
const chapterSchema = new Schema<IChapter>({
  id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, default: DEFAULT_NULL },
  videoUrl: { type: String, default: DEFAULT_NULL },
});

// Course schema definition
const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, default: DEFAULT_NULL },
    imageUrl: { type: String, default: DEFAULT_NULL },
    chapter: chapterSchema,
  },
  {
    timestamps: true,
  }
);

// Model export
const Course =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
