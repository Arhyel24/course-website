import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { ICourse } from "@/app/models/Course";

type CourseSidebarProps = {
  course: ICourse;
  progressCount: number;
};

export default async function CourseSidebar({
  course,
  progressCount,
}: CourseSidebarProps) {
  const userId = "wazirina";

  if (!userId) {
    return redirect("/");
  }

  const purchase = {};

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="flex flex-col border-b p-8">
        <h1 className="text-lg font-semibold">{course.title}</h1>
        {purchase ? (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        ) : null}
      </div>
      <div className="flex w-full flex-col">
        {course.chapter.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
}
