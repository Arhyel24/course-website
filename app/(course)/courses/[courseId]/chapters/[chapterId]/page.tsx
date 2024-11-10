import { redirect } from "next/navigation";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { CourseProgressButton } from "./_components/course-progress-button";
import getChapter from "@/actions/getChapter";

export default async function ChapterDetails({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const userId = "wazirina";

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, nextChapter } = await getChapter({
    ...params,
  });

  // console.log(chapter);
  // console.log(course);
  // console.log(nextChapter);

  if (!chapter || !course) {
    return redirect("/");
  }

  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          {/* <IKVideo
            path={chapter.videoUrl?.toString()}
            transformation={[{ height: "200", width: "600" }]}
            controls={true}
          /> */}
        </div>

        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>

            <CourseProgressButton
              courseId={params.courseId}
              nextChapterId={nextChapter}
            />
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>
        </div>
      </div>
    </div>
  );
}
