import User from "@/app/models/userModel";
import { hashPassword } from "@/lib/bcryptconfig";
import connectToDb from "@/lib/connectDataBase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDb();
  try {
    // Parse the JSON request body
    const { username, email, password } = await req.json();

    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    console.error(error);
  }
}
