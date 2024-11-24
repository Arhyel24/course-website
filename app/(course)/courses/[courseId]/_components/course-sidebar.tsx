import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import connectToDb from "@/lib/connectDataBase";
import { Chapter, Course, IChapter } from "@/app/models/Course";

type CourseSidebarProps = {
  courseId: string;
  progressCount: number;
};

async function fetchCourse(courseId: string) {
  await connectToDb();
  const course = await Course.findById(courseId);
  // console.log("s-course: ", course);

  if (!course) {
    return;
  }

  return course.title;
}

async function fetchChapters(courseId: string) {
  await connectToDb();
  const course = await Course.findById(courseId);
  // console.log("s-course: ", course);

  if (!course) {
    return [];
  }

  const chapterIds = course.chapters;

  // Fetch chapters based on the IDs
  const chapters = await Chapter.find({ _id: { $in: chapterIds } });

  return chapters;
}

export default async function CourseSidebar({
  courseId,
  progressCount,
}: CourseSidebarProps) {
  // Fetch chapters from the database
  const chapters = await fetchChapters(courseId);
  const title = await fetchCourse(courseId);

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm bg-white dark:bg-gray-800">
      <div className="flex flex-col border-b p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        {/* Display course title or ID */}
        <div className="mt-10">
          <CourseProgress variant="success" value={progressCount} />
        </div>
      </div>
      <div className="flex w-full flex-col">
        {chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id.toString()}
            id={chapter.id.toString()}
            label={chapter.title}
            courseId={courseId}
          />
        ))}
      </div>
    </div>
  );
}
