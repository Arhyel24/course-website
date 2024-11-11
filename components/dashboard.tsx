import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./ui/info-card";
import CoursesList from "./ui/course-list";
import { getCourses } from "@/actions/get-courses";
import { ICourse } from "@/app/models/Course";

export default async function Dashboard() {
  const coursesInProgress: ICourse[] = await getCourses();
  const completedCourses: ICourse[] = [];

  return (
    <div className="space-y-4 p-6">
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
