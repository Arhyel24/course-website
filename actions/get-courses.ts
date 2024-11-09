import connectToDb from "@/lib/connectDataBase";
import { Course, ICourse } from "@/app/models/Course";

export async function getCourses(): Promise<ICourse[]> {
  try {
    await connectToDb();
    const courses = await Course.find();
    // console.log(courses);
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Could not fetch courses. Please try again later.");
  }
}
