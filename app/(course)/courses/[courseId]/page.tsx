import { Course } from "@/app/models/Course";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const id = params.courseId;
  const course = await Course.findOne({ id });

  // console.log("course chapters 1", course?.chapters);

  const chapterId = course?.chapters[0].toString();

  // console.log("course chapter 2: ", chapterId);
  // console.log(course);

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/${chapterId}`);
};

export default CourseIdPage;
