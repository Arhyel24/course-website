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
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Define the message options
    const message = {
      from: {
        name: "Coach Adams",
        address: process.env.MAIL_USER as string, // Add the sender's email address
      },
      to: email,
      subject: "Massive Income in Affiliate Marketing Onboarding",
      text: `Thanks for registering, here are your temporary login details: Email ${email} and password: 12345678`,
      html: `
      <html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Roboto', sans-serif; background-color: #f7fafc; padding: 1.5rem;">
    <div style="max-width: 768px; margin: auto; background-color: white; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; overflow: hidden; border: 1px solid #e2e8f0;">
        <div style="background-color: #2b6cb0; color: white; text-align: center; padding: 2rem;">
            <h1 style="font-size: 1.75rem; font-weight: bold; margin: 0;">Welcome to "Massive Income in Affiliate Marketing"!</h1>
        </div>
        <div style="padding: 2rem; line-height: 1.6;">
            <p style="color: #4a5568; font-size: 1.125rem;">Dear ${email},</p>
            <p style="color: #4a5568; margin-top: 1rem;">Thank you for joining <em>Massive Income in Affiliate Marketing by Coach Adams</em>! I’m thrilled to guide you through this exciting journey.</p>
            <p style="color: #4a5568; margin-top: 1rem;">Here are your temporary login details:</p>
            <ul style="list-style-type: disc; padding-left: 1.5rem; color: #4a5568; margin-top: 0.5rem;">
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Password:</strong> 12345678</li>
            </ul>
            <p style="color: #4a5568; margin-top: 1rem;">To log in, please visit <a href="${process.env.NEXTAUTH_URL}login" style="color: #3182ce; text-decoration: underline; font-weight: bold;">${process.env.NEXTAUTH_URL}login</a>.</p>
            <p style="color: #4a5568; margin-top: 1rem;"><strong>Important:</strong> For security reasons, please update your username and password as soon as you log in. This will ensure your account remains secure and personalized for your needs.</p>
            <p style="color: #4a5568; margin-top: 1rem;">Once you finish the course, you’ll gain access to my exclusive mentorship group, where you’ll:</p>
            <ul style="color: #4a5568; margin-left: 1.5rem;">
                <li>Receive premium materials not available in the course.</li>
                <li>Get personalized guidance and advanced strategies to boost your results.</li>
                <li>Connect with like-minded individuals striving for success.</li>
            </ul>
            <p style="color: #4a5568; margin-top: 1rem;">Connect with like-minded individuals striving for success.<br>So, stay consistent, work through the lessons, and take that next step toward achieving massive income.</p>
            <p style="color: #4a5568; margin-top: 1rem;">Let’s achieve massive success together!</p>
            <p style="color: #4a5568; margin-top: 1rem;">Best regards,</p>
            <p style="color: #4a5568; margin-top: 0.5rem;">Coach Adams</p>
            <p style="color: #4a5568;"><em>Massive Income in Affiliate Marketing</em></p>
        </div>
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
