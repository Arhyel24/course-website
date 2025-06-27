import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";
import { ICourse } from "@/app/models/Course";

type CourseMobileSidebarProps = {
  course: ICourse;
  progressCount: number;
};

export default function CourseMobileSidebar({
  course,
  progressCount,
}: CourseMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <MenuIcon />
      </SheetTrigger>

      <SheetContent side="left" className="w-72 bg-white dark:bg-gray-800 p-0">
        <CourseSidebar courseId={course.id} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
}
