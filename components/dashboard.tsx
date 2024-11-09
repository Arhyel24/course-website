import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./ui/info-card";
import CoursesList from "./ui/course-list";
import { getCourses } from "@/actions/get-courses";
import {
  getCourseWithChapters,
  ICourse,
  getCourseWithChaptersAlternative,
  createCourseWithChapters,
} from "@/app/models/Course";
import connectToDb from "@/lib/connectDataBase";

export default async function Dashboard() {
  const populatedCourse = await getCourseWithChapters(
    "672fb45b0c3d5147acc72944"
  );
  console.log("Populated Course:", populatedCourse);

  try {
    await connectToDb();
    // Create course with initial chapters

    const { course } = await createCourseWithChapters();

    // Fetch course with chapters using different methods
    const populatedCourse1 = await getCourseWithChapters(course._id as string);
    const populatedCourse2 = await getCourseWithChaptersAlternative(
      course._id as string
    );

    console.log("Populated Course (Method 1):", populatedCourse1);
    console.log("Populated Course (Method 2):", populatedCourse2);
  } catch (error) {
    console.error("Error in run example:", error.message);
  }
  const coursesInProgress: ICourse[] = await getCourses();
  const completedCourses: ICourse[] = [];

  return (
    <div className="space-y-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />

        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
