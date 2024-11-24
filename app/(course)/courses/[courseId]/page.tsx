import { Course } from "@/app/models/Course";
import authOptions from "@/lib/AuthOptions";
import connectToDb from "@/lib/connectDataBase";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/**
 * Page to handle course redirection based on the course ID.
 * If the course exists, redirects to the first chapter.
 * Otherwise, redirects to the homepage.
 */
const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  await connectToDb();
  const courseId = params.courseId;

  const course = await Course.findById(courseId as string).populate("chapters");

  // If no course is found, redirect to the homepage
  if (!course) {
    return redirect("/");
  }

  // Validate the presence of chapters
  if (!course.chapters || course.chapters.length === 0) {
    console.warn(`Course ${courseId} has no chapters.`);
    return redirect(`/`);
  }

  // Extract the first chapter ID for redirection
  const firstChapterId = course.chapters[0]?._id?.toString();

  if (!firstChapterId) {
    console.error(
      `First chapter ID for course ${courseId} could not be resolved.`
    );
    return redirect(`/courses/${courseId}`);
  }

  // Redirect to the first chapter
  return redirect(`/courses/${course._id}/chapters/${firstChapterId}`);
};

export default CourseIdPage;
