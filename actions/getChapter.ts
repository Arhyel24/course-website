import { Chapter, Course, IChapter, ICourse } from "@/app/models/Course";
import connectToDb from "@/lib/connectDataBase";

type GetChapterArgs = {
  courseId: string;
  chapterId: string;
};

interface GetChapterResponse {
  chapter: IChapter | null;
  course: ICourse | null;
  nextChapterId: string | null;
}

export default async function getChapter({
  courseId,
  chapterId,
}: GetChapterArgs): Promise<GetChapterResponse> {
  try {
    await connectToDb();

    const course = await Course.findById(courseId).populate({
      path: "chapters",
      options: { sort: { order: 1 } }, // Ensure chapters are sorted by "order"
    });

    if (!course) {
      console.error("Course not found");
      return { chapter: null, course: null, nextChapterId: null };
    }

    const chapter = course.chapters.find(
      (ch) => ch._id.toString() === chapterId
    ) as IChapter | null;

    if (!chapter) {
      console.error("Chapter not found");
      return { chapter: null, course, nextChapterId: null };
    }

    const nextChapter = course.chapters.find(
      (ch) => ch.order === chapter.order + 1
    );

    return {
      chapter,
      course,
      nextChapterId: nextChapter ? nextChapter._id.toString() : null,
    };
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return { chapter: null, course: null, nextChapterId: null };
  }
}
