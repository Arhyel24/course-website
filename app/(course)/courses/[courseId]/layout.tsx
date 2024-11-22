import { redirect } from "next/navigation";
import CourseNavbar from "./_components/course-navbar";
import CourseSidebar from "./_components/course-sidebar";
import { Course } from "@/app/models/Course";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const userId = "wazirina";

  if (!userId) {
    return redirect("/login");
  }

  const id = params.courseId;
  // console.log(id);

  const course = await Course.findOne({ id }).populate("chapters");

  console.log(course?.id);

  if (!course) {
    return redirect("/");
  }

  const progressCount = 60;

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-20 w-full md:pl-80">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>

      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
        <CourseSidebar courseId={course.id} progressCount={progressCount} />
      </div>

      <main className="h-full md:pl-80">{children}</main>
    </div>
  );
}
