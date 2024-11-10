import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Default values
const DEFAULT_NULL = null;

// Chapter interface
export interface IChapter extends Document {
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Course interface
export interface ICourse extends Document {
  title: string | null;
  description?: string | null;
  imageUrl?: string | null;
  chapters: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Chapter schema definition
const chapterSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Chapter title is required"],
      minlength: [1, "Title must be at least 1 character long"],
    },
    description: {
      type: String,
      default: null,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      required: [true, "Chapter order is required"],
      min: [1, "Order must be at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

const Chapter: Model<ICourse> =
  mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

// Course schema definition
const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required."],
    },
    description: {
      type: String,
      default: DEFAULT_NULL,
    },
    imageUrl: {
      type: String,
      default: DEFAULT_NULL,
    },
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model export
const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export { Course, Chapter };
