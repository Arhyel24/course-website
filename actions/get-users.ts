import connectToDb from "@/lib/connectDataBase";
import User, { IUser } from "@/app/models/userModel";

export async function getUsers(): Promise<IUser[]> {
  try {
    await connectToDb();
    const users = await User.find();
    // console.log(courses);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch courses. Please try again later.");
  }
}
