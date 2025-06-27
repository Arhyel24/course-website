import { Course } from "@/app/models/Course";
import connectToDb from "@/lib/connectDataBase";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDb();
  try {
    const courses = await Course.find({}).populate("chapters").lean();

    // console.log(courses);

    // Return the users with a 200 status code
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses in json:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
