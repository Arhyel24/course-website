import User from "@/app/models/userModel";
import connectToDb from "@/lib/connectDataBase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDb();
  try {
    // Parse the JSON request body
    const { email } = await req.json();

    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
