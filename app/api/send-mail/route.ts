import User from "@/app/models/userModel";
import { hashPassword } from "@/lib/bcryptconfig";
import connectToDb from "@/lib/connectDataBase";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON request body
    const { email } = await req.json();

    // Create a transporter using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465, // Port 465 requires SSL/TLS from the start
      secure: true, // Use SSL/TLS -  587 (STARTTLS)
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });


    // Define the message options
    const message = {
      from: {
        name: "Coach Adams",
        address: process.env.MAIL_USER as string,
      },
      to: email,
      subject: "Your Login Details - Affiliate Marketing Program",
      text: `Thanks for registering! Here are your temporary login details:\nEmail: ${email}\nPassword: 12345678\n\nLog in here: ${process.env.NEXTAUTH_URL}login\n\nPlease update your password after logging in.\n\nBest,\nCoach Adams`,
      html: `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f7fafc;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #2b6cb0;">Welcome to the Affiliate Marketing Program!</h2>
          <p>Hi ${email},</p>
          <p>Thanks for joining! Here are your temporary login details:</p>
          <p><strong>Email:</strong> ${email} <br> <strong>Password:</strong> 12345678</p>
          <p><a href="${process.env.NEXTAUTH_URL}login" style="color: #3182ce; text-decoration: none; font-weight: bold;">Click here to log in</a></p>
          <p><strong>Important:</strong> Please update your password after logging in.</p>
          <p>Best,<br><strong>Coach Adams</strong></p>
        </div>
      </body>
    </html>
  `,
    };

    // Send the email
    await transporter.sendMail(message);

    return NextResponse.json(
      { message: "email sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
