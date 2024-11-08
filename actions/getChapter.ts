import Course, { IChapter } from "@/app/models/Course";
import connectToDb from "@/lib/connectDataBase";

type GetChapterArgs = {
  courseId: string;
  chapterId: string;
};

export async function getChapter({ courseId, chapterId }: GetChapterArgs) {
  try {
    await connectToDb();
    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      return {
        chapter: null,
        course: null,
        nextChapter: null,
      };
    }

    const chapters = course.chapter;

    const index = chapters.findIndex(
      (chap: IChapter) => chap.id.toString() === chapterId
    );

    if (index === -1) {
      return {
        chapter: null,
        course,
        nextChapter: null,
      };
    }

    const chapter = chapters[index];
    const nextChapter =
      index + 1 < chapters.length ? chapters[index + 1].id : null;

    return {
      chapter,
      course,
      nextChapter,
    };
  } catch (error) {
    console.error(error);
    return {
      chapter: null,
      course: null,
      nextChapter: null,
    };
  }
}
