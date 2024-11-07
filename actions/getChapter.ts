import Course from "@/app/models/Course";
import connectToDb from "@/lib/connectDataBase";

type GetChapterArgs = {
  courseId: string;
  chapterId: string;
};

export async function getChapter({ courseId, chapterId }: GetChapterArgs) {
  try {
    await connectToDb();
    const course = await Course.findOne();

    const chapters = course.chapter;

    const { chapter, index } = chapters.map((chap, index) => {
      const chapter = chap.id === chapterId;
      return { chapter, index };
    });

    const nextChapter = chapters[index + 1].id;
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
