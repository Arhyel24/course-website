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

  const { chapter, course, nextChapterId } = await getChapter({
    ...params,
  });

  console.log("current chapter: ", chapter);
  console.log("chapter course: ", course);
  console.log("Next chapter: ", nextChapterId);

  if (!chapter || !course) {
    return redirect("/");
  }

  const url = chapter.videoUrl as string;
  const vidId = url.slice(-11);
  console.log(vidId);

  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-col pb-20 mt-20 pt-12">
        <div className="p-4 w-full">
          {/* <video
            className="w-full"
            width="320"
            height="240"
            controls
            preload="auto"
            autoPlay
            loop
          >
            <source
              src={`https://www.youtube.com/embed/${vidId}`}
              type="video/mp4"
            />
          </video> */}
          <iframe
            className="w-full aspect-video mt-4" // Full width and 16:9 aspect ratio
            src={`https://www.youtube.com/embed/${vidId}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
            allow="autoplay; fullscreen"
            title={chapter.title}
            allowFullScreen
          ></iframe>
        </div>

        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>

            <CourseProgressButton
              courseId={params.courseId}
              nextChapterId={nextChapterId}
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
