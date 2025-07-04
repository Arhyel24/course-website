import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./ui/info-card";
import CoursesList from "./ui/course-list";
import { ICourse } from "@/app/models/Course";

import { getCourses } from "@/actions/get-courses";
export default async function Dashboard() {
  let coursesInProgress: ICourse[] = [];
  const completedCourses: ICourse[] = [];

  try {
    const courses = await getCourses();
    coursesInProgress = courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
          variant="default"
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

