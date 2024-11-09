import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Default values
const DEFAULT_NULL = null;

// Chapter interface
export interface IChapter extends Document {
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  course: Types.ObjectId; // Reference to the course
  order: number; // To maintain chapter order
  createdAt?: Date;
  updatedAt?: Date;
}

// Course interface
export interface ICourse extends Document {
  title: string | null;
  description?: string | null;
  imageUrl?: string | null;
  chapters: Types.ObjectId[]; // Array of chapter references
  createdAt?: Date;
  updatedAt?: Date;
}

// Chapter schema definition
const chapterSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Chapter title is required"],
      trim: true,
      minlength: [1, "Title must be at least 1 character long"],
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    videoUrl: {
      type: String,
      default: null,
      validate: {
        validator: function (v: string) {
          // Optional URL validation
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Invalid video URL format",
      },
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },
    order: {
      type: Number,
      required: [true, "Chapter order is required"],
      min: [1, "Order must be at least 1"],
    },
  },
  {
    timestamps: true,
    // Strict mode to catch undefined fields
    strict: true,
  }
);

// Course schema definition
const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required."],
      trim: true,
    },
    description: {
      type: String,
      default: DEFAULT_NULL,
      validate: {
        validator: function (value: string) {
          return value.length <= 500;
        },
        message: "Description must be less than or equal to 500 characters.",
      },
    },
    imageUrl: {
      type: String,
      default: DEFAULT_NULL,
      validate: {
        validator: function (value: string) {
          return /^https?:\/\/.+\..+/.test(value);
        },
        message: "Image URL must be a valid URL.",
      },
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
    strict: false,
  }
);

// Model export
const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
const Chapter: Model<IChapter> =
  mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

export { Course, Chapter };

// Enhanced population function with more robust handling
export async function getCourseWithChapters(courseId: string) {
  try {
    // Use lean() for performance and to ensure plain JavaScript objects
    const courseWithChapters = await Course.findById(courseId)
      .populate({
        path: "chapters",
        options: {
          sort: { order: 1 }, // Sort chapters by order
          // Disable strict mode during population
          strictPopulate: false,
        },
        // Explicitly select fields to populate
        select: "title description videoUrl order -_id",
      })
      .lean()
      .exec();

    return courseWithChapters;
  } catch (error) {
    console.error("Error fetching course with chapters:", error);
    throw error;
  }
}

// Comprehensive course creation function
export async function createCourseWithChapters() {
  try {
    // Create a new course
    const course = new Course({
      title: "Introduction to TypeScript",
      description: "A comprehensive course on TypeScript fundamentals",
      imageUrl: "https://example.com/typescript-course.jpg",
    });

    // Save the course first
    await course.save();

    // Create chapters and link them to the course
    const chapters = [
      new Chapter({
        title: "TypeScript Basics",
        description: "Understanding TypeScript fundamentals",
        videoUrl: "https://example.com/typescript-basics.mp4",
        course: course._id,
        order: 1,
      }),
      new Chapter({
        title: "Advanced Types",
        description: "Deep dive into TypeScript type system",
        videoUrl: "https://example.com/advanced-types.mp4",
        course: course._id,
        order: 2,
      }),
      new Chapter({
        title: "Generics and Interfaces",
        description: "Exploring generics and interfaces in TypeScript",
        videoUrl: "https://example.com/generics-interfaces.mp4",
        course: course._id,
        order: 3,
      }),
    ];

    // Save all chapters
    const savedChapters = await Chapter.insertMany(chapters);

    // Update course with chapter references
    const tr = savedChapters.map((chapter) => chapter._id as Types.ObjectId);
    console.log("Chapters: ", tr);
    course.chapters = tr;
    await course.save();

    return { course, chapters: savedChapters };
  } catch (error) {
    console.error("Error creating course with chapters:", error.message);
    throw error;
  }
}

// Alternative population method
export async function getCourseWithChaptersAlternative(courseId: string) {
  try {
    // Fetch course and chapters separately
    const course = await Course.findById(courseId).lean().exec();

    if (!course) {
      throw new Error("Course not found");
    }

    // Fetch chapters directly
    const chapters = await Chapter.find({
      course: courseId,
    })
      .sort({ order: 1 })
      .lean()
      .exec();

    // Combine course with chapters
    return {
      ...course,
      chapters,
    };
  } catch (error) {
    console.error("Error fetching course with chapters:", error);
    throw error;
  }
}

// Utility function to add chapters to an existing course
export async function addChaptersToCourse(
  courseId: string,
  chapterData: Partial<IChapter>[]
) {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    const newChapters = chapterData.map(
      (data) =>
        new Chapter({
          ...data,
          course: courseId,
          // Ensure order is set if not provided
          order: data.order || course.chapters.length + 1,
        })
    );

    const savedChapters = await Chapter.insertMany(newChapters);

    // Add new chapter IDs to course
    course.chapters.push(
      ...savedChapters.map((chapter) => chapter._id as Types.ObjectId)
    );
    await course.save();

    return savedChapters;
  } catch (error) {
    console.error("Error adding chapters:", error);
    throw error;
  }
}
