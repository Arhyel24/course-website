import connectToDb from "@/lib/connectDataBase";
import { Course, ICourse } from "@/app/models/Course";

/**
 * Fetches all courses with their populated chapters.
 *
 * @returns {Promise<ICourse[]>} List of courses or an empty array if an error occurs.
 */

export async function getCourses(): Promise<ICourse[]> {
  await connectToDb();

  try {
    const courses = await Course.find().populate("chapters");

    return courses;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Error fetching courses from the database:",
        error instanceof Error ? error.message : error
      );
    } else {
      console.error("Error fetching courses. Please check the database.");
    }

    // Return an empty array as a fallback to prevent app crashes
    return [];
  }
}
