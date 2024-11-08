import { redirect } from "next/navigation";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { CourseProgressButton } from "./_components/course-progress-button";
import { getChapter } from "@/actions/getChapter";
import YouTube from "react-youtube";
import { FormEvent } from "react";

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

  if (!chapter || !course) {
    return redirect("/");
  }

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  function onReady(event) {
    event.target.pauseVideo();
  }

  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          <YouTube videoId="sTnm5jvjgjM" opts={opts} onReady={onReady} />
        </div>

        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>

            <CourseProgressButton
              chapterId={params.chapterId}
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
