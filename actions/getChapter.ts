import { Chapter, Course, IChapter, ICourse } from "@/app/models/Course";
import connectToDb from "@/lib/connectDataBase";

type GetChapterArgs = {
  courseId: string;
  chapterId: string;
};

// interface GetChapterResponse {
//   chapter: IChapter | null;
//   course: ICourse | null;
//   nextChapter: string | null;
// }

export default async function getChapter({
  courseId,
  chapterId,
}: GetChapterArgs) {
  try {
    // Connect to the database
    await connectToDb();

    // Find the course and populate chapters
    const course = await Course.findById(courseId).populate("chapters");

    if (!course) {
      return {
        chapter: null,
        course: null,
        nextChapter: null,
      };
    }

    // Find the chapter index
    const chapterIndex = course.chapters.findIndex(
      (chap) => chap._id.toString() === chapterId
    );

    if (chapterIndex === -1) {
      return {
        chapter: null,
        course,
        nextChapter: null,
      };
    }

    const chapterI = course.chapters[chapterIndex];

    const chapter = await Chapter.findById(chapterI);

    const nextChapter =
      chapterIndex + 1 < course.chapters.length
        ? course.chapters[chapterIndex + 1]._id.toString()
        : null;

    return {
      chapter,
      course,
      nextChapter,
    };
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return {
      chapter: null,
      course: null,
      nextChapter: null,
    };
  }
}
