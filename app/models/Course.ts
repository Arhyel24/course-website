import mongoose, { Document, Schema } from "mongoose";

// Default values
const DEFAULT_NULL = null;

// Chapter interface
export interface IChapter extends Document {
  title: string;
  description?: string | null;
  videoUrl?: string | null;
}

// Course interface
export interface ICourse extends Document {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  chapters: IChapter[]; // Changed to 'chapters' for clarity
  createdAt?: Date;
  updatedAt?: Date;
}

// Chapter schema definition
const chapterSchema = new Schema<IChapter>({
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
    chapters: { type: [chapterSchema], required: true }, // Changed to 'chapters'
  },
  {
    timestamps: true,
  }
);

// Model export
const Course =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);
const Chapter =
  mongoose.models.Chapter || mongoose.model<IChapter>("Chapter", chapterSchema);

export { Course, Chapter };
