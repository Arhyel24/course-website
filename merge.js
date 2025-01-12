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

// async function addCoursesFromJson(jsonFilePath) {
//   try {
//     // Connect to the MongoDB database
//     await mongoose.connect(
//       "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks");

//     console.log("Connected to the database.");

//     // Read the JSON file
//     const rawData = fs.readFileSync(jsonFilePath, "utf-8");
//     const courses = JSON.parse(rawData);

//     // Insert the courses into the database
//     const insertedCourses = await Course.insertMany(courses);

//     console.log(`${insertedCourses.length} courses added to the database.`);
//   } catch (error) {
//     console.error("Error adding courses:", error);
//   } finally {
//     // Disconnect from the database
//     await mongoose.disconnect();
//     console.log("Disconnected from the database.");
//   }
// }

// // Example usage
// const jsonFilePath = "./database-backup/courses.json";
// addCoursesFromJson(jsonFilePath).catch(console.error);

// async function addChaptersAndReturnIds(chapterJsonPath, outputJsonPath) {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(
//       "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks"
//     );

//     console.log("Connected to the database.");

//     // Read the chapter JSON file
//     const chapterData = JSON.parse(fs.readFileSync(chapterJsonPath, "utf-8"));

//     // Insert chapters into the database
//     const insertedChapters = await Chapter.insertMany(chapterData);

//     // Extract only the _id field and convert it to 'id'
//     const chapterIds = insertedChapters.map((chapter) =>
//       chapter._id.toString()
//     );

//     // Optionally, save the IDs to a new JSON file
//     fs.writeFileSync(
//       outputJsonPath,
//       JSON.stringify(chapterIds, null, 2),
//       "utf-8"
//     );

//     console.log(
//       `Inserted ${insertedChapters.length} chapters and saved their IDs to ${outputJsonPath}.`
//     );
//     console.log("Chapter IDs:", chapterIds);

//     return chapterIds; // Return the array of chapter IDs
//   } catch (error) {
//     console.error("Error adding chapters:", error);
//   } finally {
//     // Disconnect from MongoDB
//     await mongoose.disconnect();
//     console.log("Disconnected from the database.");
//   }
// }

// // Example usage
// const chapterJsonPath = "./database-backup/chapters.json"; // Adjust path to your chapters JSON file
// const outputJsonPath = "./database-backup/chapterIds.json"; // Output path for the saved file
// addChaptersAndReturnIds(chapterJsonPath, outputJsonPath)
//   .then((chapterIds) => {
//     console.log("Returned Chapter IDs:", chapterIds);
//   })
//   .catch(console.error);

// const chapters = [
//   "6784029f4309211c15fe9f9e",
//   "6784029f4309211c15fe9f9f",
//   "6784029f4309211c15fe9fa0",
//   "6784029f4309211c15fe9fa1",
//   "6784029f4309211c15fe9fa2",
//   "6784029f4309211c15fe9fa3",
//   "6784029f4309211c15fe9fa4",
//   "6784029f4309211c15fe9fa5",
//   "6784029f4309211c15fe9fa6",
//   "6784029f4309211c15fe9fa7",
//   "6784029f4309211c15fe9fa8",
//   "6784029f4309211c15fe9fa9",
//   "6784029f4309211c15fe9faa",
//   "6784029f4309211c15fe9fab",
//   "6784029f4309211c15fe9fac",
//   "6784029f4309211c15fe9fad",
//   "6784029f4309211c15fe9fae",
//   "6784029f4309211c15fe9faf",
//   "6784029f4309211c15fe9fb0",
//   "6784029f4309211c15fe9fb1",
//   "6784029f4309211c15fe9fb2",
//   "6784029f4309211c15fe9fb3",
//   "6784029f4309211c15fe9fb4",
//   "6784029f4309211c15fe9fb5",
//   "6784029f4309211c15fe9fb6",
//   "6784029f4309211c15fe9fb7",
//   "6784029f4309211c15fe9fb8",
//   "6784029f4309211c15fe9fb9",
//   "6784029f4309211c15fe9fba",
//   "6784029f4309211c15fe9fbb",
//   "6784029f4309211c15fe9fbc",
//   "6784029f4309211c15fe9fbd",
//   "6784029f4309211c15fe9fbe",
//   "6784029f4309211c15fe9fbf",
//   "6784029f4309211c15fe9fc0",
//   "6784029f4309211c15fe9fc1",
//   "6784029f4309211c15fe9fc2",
//   "6784029f4309211c15fe9fc3",
//   "6784029f4309211c15fe9fc4",
//   "6784029f4309211c15fe9fc5",
//   "6784029f4309211c15fe9fc6",
//   "6784029f4309211c15fe9fc7",
//   "6784029f4309211c15fe9fc8",
//   "6784029f4309211c15fe9fc9",
//   "6784029f4309211c15fe9fca",
//   "6784029f4309211c15fe9fcb",
//   "6784029f4309211c15fe9fcc",
//   "6784029f4309211c15fe9fcd",
//   "6784029f4309211c15fe9fce",
//   "6784029f4309211c15fe9fcf",
//   "6784029f4309211c15fe9fd0",
//   "6784029f4309211c15fe9fd1",
//   "6784029f4309211c15fe9fd2",
//   "6784029f4309211c15fe9fd3",
//   "6784029f4309211c15fe9fd4",
//   "6784029f4309211c15fe9fd5",
//   "6784029f4309211c15fe9fd6",
//   "6784029f4309211c15fe9fd7",
//   "6784029f4309211c15fe9fd8",
// ];

// console.log(chapters.length);

// const firstPart = chapters.slice(0, 37); // First 38 items
// const secondPart = chapters.slice(37, 52); // Next 15 items (from index 38 to 52)
// const thirdPart = chapters.slice(52, 60); // Next 7 items (from index 53 to 59)

// console.log(firstPart.length, secondPart.length, thirdPart.length);

// async function updateCourseChapters(courseId, chapterIds) {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(
//       "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks");

//     console.log("Connected to the database.");

//     // Ensure chapterIds are in ObjectId format
//     const ObjectId = mongoose.Types.ObjectId;
//     const chapterObjectIds = chapterIds.map((id) => new ObjectId(id));

//     // Find the course by its ID and update the chapters
//     const updatedCourse = await Course.findByIdAndUpdate(
//       courseId,
//       { $set: { chapters: chapterObjectIds } },
//       { new: true } // Return the updated course document
//     );

//     if (!updatedCourse) {
//       throw new Error("Course not found.");
//     }

//     console.log("Course updated:", updatedCourse);
//     return updatedCourse;
//   } catch (error) {
//     console.error("Error updating course:", error);
//   } finally {
//     // Disconnect from MongoDB
//     await mongoose.disconnect();
//     console.log("Disconnected from the database.");
//   }
// }

// // Example usage
// const courseId = "6783d268a7c323d892cca3e2"; // Replace with actual course ID

// updateCourseChapters(courseId, thirdPart)
//   .then((updatedCourse) => {
//     console.log("Updated Course:", updatedCourse);
//   })
//   .catch(console.error);
