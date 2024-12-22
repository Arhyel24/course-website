import { redirect } from "next/navigation";
import CourseNavbar from "./_components/course-navbar";
import CourseSidebar from "./_components/course-sidebar";
import { Course } from "@/app/models/Course";
import connectToDb from "@/lib/connectDataBase";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  await connectToDb();

  const id = params.courseId;

  const course = await Course.findById(id).populate("chapters");

  // console.log("id in layout: ", course?.id);
  //console.log("course in layout: ", course);

  if (!course) {
    return redirect("/");
  }

  const progressCount = 60;

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      <div className="fixed inset-y-0 z-50 h-20 w-full md:pl-80 bg-white dark:bg-gray-800">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>

      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex bg-white dark:bg-gray-800">
        <CourseSidebar courseId={course.id} progressCount={progressCount} />
      </div>

      <main className="h-full md:pl-80 bg-gray-100 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
