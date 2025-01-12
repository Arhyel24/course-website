import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./ui/info-card";
import CoursesList from "./ui/course-list";
import { ICourse } from "@/app/models/Course";

export default async function Dashboard() {
  let coursesInProgress: ICourse[] = [];
  const completedCourses: ICourse[] = [];

  try {
    // Construct the API URL
    const apiUrl = `${process.env.NEXTAUTH_URL}/api/getcourses`;

    // Fetch courses from the API
    const courses = await fetch(apiUrl, { method: "GET" });

    

    // Parse the response JSON
    const tsx = await courses.json();

    // console.log(tsx);

    coursesInProgress = tsx.courses || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    coursesInProgress = [];
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
