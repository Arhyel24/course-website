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

// const mongoose = require("mongoose");
// const fs = require("fs");

// const chapterSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, default: null },
//     videoUrl: { type: String, default: null },
//     courseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true,
//     },
//     order: { type: Number, required: true },
//   },
//   {
//     timestamps: true, // This will automatically add createdAt and updatedAt
//   }
// );

// const Chapter = mongoose.model("Chapter", chapterSchema);

// const courseSchema = new mongoose.Schema(
//   {
//     title: { type: String, default: null },
//     description: { type: String, default: null },
//     imageUrl: { type: String, default: null },
//     chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
//   },
//   {
//     timestamps: true, // This will automatically add createdAt and updatedAt
//   }
// );

// const Course = mongoose.model("Course", courseSchema);

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

// Example usage
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
//   "67e7343832611beb348829a2",
//   "67e7343832611beb348829a3",
//   "67e7343832611beb348829a4",
//   "67e7343832611beb348829a5",
//   "67e7343832611beb348829a6",
//   "67e7343832611beb348829a7",
//   "67e7343832611beb348829a8",
//   "67e7343832611beb348829a9",
//   "67e7343832611beb348829aa",
//   "67e7343832611beb348829ab",
//   "67e7343832611beb348829ac",
//   "67e7343832611beb348829ad",
//   "67e7343832611beb348829ae",
//   "67e7343832611beb348829af",
//   "67e7343832611beb348829b0",
//   "67e7343832611beb348829b1",
//   "67e7343832611beb348829b2",
//   "67e7343832611beb348829b3",
//   "67e7343832611beb348829b4",
//   "67e7343832611beb348829b5",
//   "67e7343832611beb348829b6",
//   "67e7343832611beb348829b7",
//   "67e7343832611beb348829b8",
//   "67e7343832611beb348829b9",
//   "67e7343832611beb348829ba",
//   "67e7343832611beb348829bb",
//   "67e7343832611beb348829bc",
//   "67e7343832611beb348829bd",
//   "67e7343832611beb348829be",
//   "67e7343832611beb348829bf",
//   "67e7343832611beb348829c0",
//   "67e7343832611beb348829c1",
//   "67e7343832611beb348829c2",
//   "67e7343832611beb348829c3",
//   "67e7343832611beb348829c4",
//   "67e7343832611beb348829c5",
//   "67e7343832611beb348829c6",
//   "67e7343832611beb348829c7",
//   "67e7343832611beb348829c8",
//   "67e7343832611beb348829c9",
//   "67e7343832611beb348829ca",
//   "67e7343832611beb348829cb",
//   "67e7343832611beb348829cc",
//   "67e7343832611beb348829cd",
//   "67e7343832611beb348829ce",
//   "67e7343832611beb348829cf",
//   "67e7343832611beb348829d0",
//   "67e7343832611beb348829d1",
//   "67e7343832611beb348829d2",
//   "67e7343832611beb348829d3",
//   "67e7343832611beb348829d4",
//   "67e7343832611beb348829d5",
//   "67e7343832611beb348829d6",
//   "67e7343832611beb348829d7",
//   "67e7343832611beb348829d8",
//   "67e7343832611beb348829d9",
//   "67e7343832611beb348829da",
//   "67e7343832611beb348829db",
//   "67e7343832611beb348829dc",
//   "67e7343832611beb348829dd",
//   "67e7343832611beb348829de",
//   "67e7343832611beb348829df",
//   "67e7343832611beb348829e0",
//   "67e7343832611beb348829e1",
//   "67e7343832611beb348829e2",
//   "67e7343832611beb348829e3",
// ];

// console.log(chapters.length);

// const firstPart = chapters.slice(0, 44); // First 38 items
// const secondPart = chapters.slice(44, 59);
// const thirdPart = chapters.slice(59, 67); // Last 8 items (from index 53 to 60)

// console.log(firstPart.length, secondPart.length, thirdPart.length);
// console.log(firstPart.length + secondPart.length + thirdPart.length);


// async function updateCourseChapters(courseId, chapterIds) {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(
//       "mongodb+srv://arhyelphilip024:Ferry@myworks.yl0en.mongodb.net/courseDb?retryWrites=true&w=majority&appName=myworks"
//     );

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

// // // Example usage
// const courseId = "67e73185fc69023de0f84022"; // Replace with your actual course ID

// updateCourseChapters(courseId, thirdPart)
//   .then((updatedCourse) => {
//     console.log("Updated Course:", updatedCourse);
//   })
//   .catch(console.error);
