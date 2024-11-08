import connectToDb from "@/lib/connectDataBase";
import Course, { ICourse } from "@/app/models/Course";

export async function getCourses(): Promise<ICourse[]> {
  await connectToDb();
  return await Course.find();
}
