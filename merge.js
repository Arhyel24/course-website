// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");

// async function exportDatabaseToJson(mongoUri, outputDir) {
//   try {
//     // Connect to the MongoDB database
//     await mongoose.connect(mongoUri);

//     console.log("Connected to the database.");

//     // Safely access the `db` property
//     const db = mongoose.connection.db;
//     if (!db) {
//       throw new Error("Database connection is not established.");
//     }

//     // Get all collection names
//     const collections = await db.listCollections().toArray();
//     const collectionNames = collections.map((col) => col.name);

//     // Ensure the output directory exists
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }

//     // Fetch and save data for each collection
//     for (const collectionName of collectionNames) {
//       const data = await db.collection(collectionName).find({}).toArray();
//       const filePath = path.join(outputDir, `${collectionName}.json`);

//       // Write the data to a JSON file
//       fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
//       console.log(`Exported ${collectionName} to ${filePath}`);
//     }

//     console.log("Database export completed.");
//   } catch (error) {
//     console.error("Error exporting database:", error);
//   } finally {
//     // Disconnect from the database
//     await mongoose.disconnect();
//     console.log("Disconnected from the database.");
//   }
// }

// // Example usage
// const mongoUri =
//   "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks";
// const outputDir = "./database-backup";

// exportDatabaseToJson(mongoUri, outputDir).catch(console.error);

const mongoose = require("mongoose");
const fs = require("fs");

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    videoUrl: { type: String, default: null },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: { type: Number, required: true },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt
  }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    imageUrl: { type: String, default: null },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt
  }
);

const Course = mongoose.model("Course", courseSchema);

async function addCoursesFromJson(jsonFilePath) {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(
      "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks");

    console.log("Connected to the database.");

    // Read the JSON file
    const rawData = fs.readFileSync(jsonFilePath, "utf-8");
    const courses = JSON.parse(rawData);

    // Insert the courses into the database
    const insertedCourses = await Course.insertMany(courses);

    console.log(`${insertedCourses.length} courses added to the database.`);
  } catch (error) {
    console.error("Error adding courses:", error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

// // Example usage
// const jsonFilePath = "./database-backup/courses.json";
// addCoursesFromJson(jsonFilePath).catch(console.error);

async function addChaptersAndReturnIds(chapterJsonPath, outputJsonPath) {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks"
    );

    console.log("Connected to the database.");

    // Read the chapter JSON file
    const chapterData = JSON.parse(fs.readFileSync(chapterJsonPath, "utf-8"));

    // Insert chapters into the database
    const insertedChapters = await Chapter.insertMany(chapterData);

    // Extract only the _id field and convert it to 'id'
    const chapterIds = insertedChapters.map((chapter) =>
      chapter._id.toString()
    );

    // Optionally, save the IDs to a new JSON file
    fs.writeFileSync(
      outputJsonPath,
      JSON.stringify(chapterIds, null, 2),
      "utf-8"
    );

    console.log(
      `Inserted ${insertedChapters.length} chapters and saved their IDs to ${outputJsonPath}.`
    );
    console.log("Chapter IDs:", chapterIds);

    return chapterIds; // Return the array of chapter IDs
  } catch (error) {
    console.error("Error adding chapters:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

// // Example usage
// const chapterJsonPath = "./database-backup/chapters.json"; // Adjust path to your chapters JSON file
// const outputJsonPath = "./database-backup/chapterIds.json"; // Output path for the saved file
// addChaptersAndReturnIds(chapterJsonPath, outputJsonPath)
//   .then((chapterIds) => {
//     console.log("Returned Chapter IDs:", chapterIds);
//   })
//   .catch(console.error);

const chapters = [
  '67e7def88928c0a073240a2e',
  '67e7def88928c0a073240a2f',
  '67e7def88928c0a073240a30',
  '67e7def88928c0a073240a31',
  '67e7def88928c0a073240a32',
  '67e7def88928c0a073240a33',
  '67e7def88928c0a073240a34',
  '67e7def88928c0a073240a35',
  '67e7def88928c0a073240a36',
  '67e7def88928c0a073240a37',
  '67e7def88928c0a073240a38',
  '67e7def88928c0a073240a39',
  '67e7def88928c0a073240a3a',
  '67e7def88928c0a073240a3b',
  '67e7def88928c0a073240a3c',
  '67e7def88928c0a073240a3d',
  '67e7def88928c0a073240a3e',
  '67e7def88928c0a073240a3f',
  '67e7def88928c0a073240a40',
  '67e7def88928c0a073240a41',
  '67e7def88928c0a073240a42',
  '67e7def88928c0a073240a43',
  '67e7def88928c0a073240a44',
  '67e7def88928c0a073240a45',
  '67e7def88928c0a073240a46',
  '67e7def88928c0a073240a47',
  '67e7def88928c0a073240a48',
  '67e7def88928c0a073240a49',
  '67e7def88928c0a073240a4a',
  '67e7def88928c0a073240a4b',
  '67e7def88928c0a073240a4c',
  '67e7def88928c0a073240a4d',
  '67e7def88928c0a073240a4e',
  '67e7def88928c0a073240a4f',
  '67e7def88928c0a073240a50',
  '67e7def88928c0a073240a51',
  '67e7def88928c0a073240a52',
  '67e7def88928c0a073240a53',
  '67e7def88928c0a073240a54',
  '67e7def88928c0a073240a55',
  '67e7def88928c0a073240a56',
  '67e7def88928c0a073240a57',
  '67e7def88928c0a073240a58',
  '67e7def88928c0a073240a59',
  '67e7def88928c0a073240a5a',
  '67e7def88928c0a073240a5b',
  '67e7def88928c0a073240a5c',
  '67e7def88928c0a073240a5d',
  '67e7def88928c0a073240a5e',
  '67e7def88928c0a073240a5f',
  '67e7def88928c0a073240a60',
  '67e7def88928c0a073240a61',
  '67e7def88928c0a073240a62',
  '67e7def88928c0a073240a63',
  '67e7def88928c0a073240a64',
  '67e7def88928c0a073240a65',
  '67e7def88928c0a073240a66',
  '67e7def88928c0a073240a67',
  '67e7def88928c0a073240a68',
  '67e7def88928c0a073240a69',
  '67e7def88928c0a073240a6a',
  '67e7def88928c0a073240a6b',
  '67e7def88928c0a073240a6c',
  '67e7def88928c0a073240a6d',
  '67e7def88928c0a073240a6e'
];

console.log(chapters.length);

const firstPart = chapters.slice(0, 43); // First 38 items
const secondPart = chapters.slice(43, 58);
const thirdPart = chapters.slice(58, 67); // Last 8 items (from index 53 to 60)

console.log(firstPart.length, secondPart.length, thirdPart.length);
console.log(firstPart.length + secondPart.length + thirdPart.length);


async function updateCourseChapters(courseId, chapterIds) {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks"
    );

    console.log("Connected to the database.");

    // Ensure chapterIds are in ObjectId format
    const ObjectId = mongoose.Types.ObjectId;
    const chapterObjectIds = chapterIds.map((id) => new ObjectId(id));

    // Find the course by its ID and update the chapters
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: { chapters: chapterObjectIds } },
      { new: true } // Return the updated course document
    );

    if (!updatedCourse) {
      throw new Error("Course not found.");
    }

    console.log("Course updated:", updatedCourse);
    return updatedCourse;
  } catch (error) {
    console.error("Error updating course:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
}

// // Example usage
// const courseId = "67e7de73e355ca5404744e78"; // Replace with your actual course ID

// updateCourseChapters(courseId, firstPart)
//   .then((updatedCourse) => {
//     console.log("Updated Course:", updatedCourse);
//   })
//   .catch(console.error);
