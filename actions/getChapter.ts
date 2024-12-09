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

    const course = await Course.findById(courseId).populate("chapters");
    if (!course) {
      console.log("Course not found");
      return { chapter: null, course: null, nextChapterId: null };
    }

    const chapter = (await Chapter.findById(chapterId)) as IChapter | null;
    if (!chapter) {
      return { chapter: null, course, nextChapterId: null };
    }

    const nextChapter = (await Chapter.findOne({
      courseId,
      order: chapter.order + 1,
    })) as IChapter | null;
    
    console.log(nextChapter);

    return {
      chapter,
      course,
      nextChapterId: nextChapter ? nextChapter.id : null,
    };
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return {
      chapter: null,
      course: null,
      nextChapterId: null,
    };
  }
}
