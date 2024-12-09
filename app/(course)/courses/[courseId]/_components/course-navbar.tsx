import { ICourse } from "@/app/models/Course";
import CourseMobileSidebar from "./course-mobile-sidebar";
import { NavbarRoutes } from "@/components/navbar-routes";

type CourseNavbarProps = { course: ICourse; progressCount: number };

export default function CourseNavbar({
  course,
  progressCount,
}: CourseNavbarProps) {
  return (
    <div className="flex h-full items-center border-b bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-md">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
}
