import nodemailer from "nodemailer";

export default async function sendMail(email: string) {
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
      name: "Massive Income in Affiliate Marketing",
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
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
          <style>
              body {
                  font-family: 'Roboto', sans-serif;
              }
          </style>
      </head>
      <body class="bg-gray-100 py-10">
          <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              <div class="bg-blue-500 text-white text-center py-4">
                  <h1 class="text-2xl font-bold">Welcome to "Massive Income in Affiliate Marketing"!</h1>
              </div>
              <div class="p-6">
                  <p class="text-gray-700 text-lg">Dear [Customer's Name],</p>
                  <p class="text-gray-700 mt-4">Thank you for joining <em>Massive Income in Affiliate Marketing by Coach Adams</em>! I’m thrilled to guide you through this exciting journey.</p>
                  <p class="text-gray-700 mt-4">Here are your temporary login details:</p>
                  <ul class="list-disc list-inside text-gray-700 mt-2">
                      <li><strong>Email:</strong> ${email}</li>
                      <li><strong>Password:</strong> 12345678</li>
                  </ul>
                  <p class="text-gray-700 mt-4">To log in, please visit <a href="${process.env.NEXTAUTH_URL}/login" class="text-blue-500 underline">[Insert Login URL]</a>.</p>
                  <p class="text-gray-700 mt-4"><strong>Important:</strong> For security reasons, please update your username and password as soon as you log in. This will ensure your account remains secure and personalized for your needs.</p>
                  <p>Once you finish the course, you’ll gain access to my exclusive mentorship group, where you’ll:</p>
                  <ul>
                  <li>Receive premium materials not available in the course.</li>
                  <li>Get personalized guidance and advanced strategies to boost your results.</li>
                  <li>Connect with like-minded individuals striving for success.</li>
                  </ul>
                  <p>Connect with like-minded individuals striving for success.<br>So, stay consistent, work through the lessons, and take that next step toward achieving massive income.</p>
                  <p class="text-gray-700 mt-4">Let’s achieve massive success together!</p>
                  <p class="text-gray-700 mt-4">Best regards,</p>
                  <p class="text-gray-700 mt-2">Coach Adams</p>
                  <p class="text-gray-700"><em>Massive Income in Affiliate Marketing</em></p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  // Send the email
  const info = await transporter.sendMail(message);
  console.log("Email sent: ", info.response);
}
