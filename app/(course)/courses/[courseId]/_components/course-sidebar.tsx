import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import connectToDb from "@/lib/connectDataBase";
import { Chapter, Course, IChapter } from "@/app/models/Course";

type CourseSidebarProps = {
  courseId: string;
  progressCount: number;
};

async function fetchChapters(courseId: string) {
  await connectToDb();
  const course = await Course.findById(courseId);

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
  const userId = "wazirina"; // Replace with actual user ID logic

  if (!userId) {
    return redirect("/");
  }

  const purchase = {}; // Replace with actual purchase logic

  // Fetch chapters from the database
  const chapters = await fetchChapters(courseId);

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="flex flex-col border-b p-8">
        <h1 className="text-lg font-semibold">{courseId}</h1>{" "}
        {/* Display course title or ID */}
        {purchase ? (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        ) : null}
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
