import { redirect } from "next/navigation";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { CourseProgressButton } from "./_components/course-progress-button";
import getChapter from "@/actions/getChapter";
import { ChapterVideo } from "./_components/chapter-video";

export default async function ChapterDetailsPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { chapter, course, nextChapterId } = await getChapter(params);

  if (!chapter || !course) {
    return redirect("/");
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-4 pt-12">
      <div className="mx-auto flex max-w-4xl flex-col pb-20 pt-12">
        <div className="w-full ">
          <ChapterVideo
            videoUrl={chapter.videoUrl as string}
            title={chapter.title}
          />
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-0">
              {chapter.title}
            </h2>

            <CourseProgressButton
              courseId={params.courseId}
              nextChapterId={nextChapterId}
            />
          </div>

          <Separator className="dark:bg-gray-700" />

          <div className="prose dark:prose-invert max-w-full">
            <Preview value={chapter.description!} />
          </div>
        </div>
      </div>
    </div>
  );
}
