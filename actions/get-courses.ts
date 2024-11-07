import connectToDb from "@/lib/connectDataBase";
import Course from "@/app/models/Course";

export interface typeCourse {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  progress: number;
  chapters: Chapter[];
  category?: { name: string }; // Optional category
}

interface typePCourse {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  progress: number;
  chapters: Chapter[];
  category?: { name: string }; // Optional category
}

export interface Chapter {
  id: string;
  title: string;
}

export async function getCourses<typePCourse>() {
  await connectToDb();
  return await Course.find();
}
