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
//   "67b4f454d1dd76772231d360",
//   "67b4f454d1dd76772231d361",
//   "67b4f454d1dd76772231d362",
//   "67b4f454d1dd76772231d363",
//   "67b4f454d1dd76772231d364",
//   "67b4f454d1dd76772231d365",
//   "67b4f454d1dd76772231d366",
//   "67b4f454d1dd76772231d367",
//   "67b4f454d1dd76772231d368",
//   "67b4f454d1dd76772231d369",
//   "67b4f454d1dd76772231d36a",
//   "67b4f454d1dd76772231d36b",
//   "67b4f454d1dd76772231d36c",
//   "67b4f454d1dd76772231d36d",
//   "67b4f454d1dd76772231d36e",
//   "67b4f454d1dd76772231d36f",
//   "67b4f454d1dd76772231d370",
//   "67b4f454d1dd76772231d371",
//   "67b4f454d1dd76772231d372",
//   "67b4f454d1dd76772231d373",
//   "67b4f454d1dd76772231d374",
//   "67b4f454d1dd76772231d375",
//   "67b4f454d1dd76772231d376",
//   "67b4f454d1dd76772231d377",
//   "67b4f454d1dd76772231d378",
//   "67b4f454d1dd76772231d379",
//   "67b4f454d1dd76772231d37a",
//   "67b4f454d1dd76772231d37b",
//   "67b4f454d1dd76772231d37c",
//   "67b4f454d1dd76772231d37d",
//   "67b4f454d1dd76772231d37e",
//   "67b4f454d1dd76772231d37f",
//   "67b4f454d1dd76772231d380",
//   "67b4f454d1dd76772231d381",
//   "67b4f454d1dd76772231d382",
//   "67b4f454d1dd76772231d383",
//   "67b4f454d1dd76772231d384",
//   "67b4f454d1dd76772231d385",
//   "67b4f454d1dd76772231d386",
//   "67b4f454d1dd76772231d387",
//   "67b4f454d1dd76772231d388",
//   "67b4f454d1dd76772231d389",
//   "67b4f454d1dd76772231d38a",
//   "67b4f454d1dd76772231d38b",
//   "67b4f454d1dd76772231d38c",
//   "67b4f454d1dd76772231d38d",
//   "67b4f454d1dd76772231d38e",
//   "67b4f454d1dd76772231d38f",
//   "67b4f454d1dd76772231d390",
//   "67b4f454d1dd76772231d391",
//   "67b4f454d1dd76772231d392",
//   "67b4f454d1dd76772231d393",
//   "67b4f454d1dd76772231d394",
//   "67b4f454d1dd76772231d395",
//   "67b4f454d1dd76772231d396",
//   "67b4f454d1dd76772231d397",
//   "67b4f454d1dd76772231d398",
//   "67b4f454d1dd76772231d399",
//   "67b4f454d1dd76772231d39a",
//   "67b4f454d1dd76772231d39b",
//   "67b4f454d1dd76772231d39c",
//   "67b4f454d1dd76772231d39d",
//   "67b4f454d1dd76772231d39e",
//   "67b4f454d1dd76772231d39f",
// ];

// console.log(chapters.length);

// const firstPart = chapters.slice(0, 42); // First 38 items
// const secondPart = chapters.slice(42, 57); // Next 15 items (from index 38 to 52)
// const thirdPart = chapters.slice(57, 65); // Next 7 items (from index 53 to 59)

// console.log(firstPart.length, secondPart.length, thirdPart.length);

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

// // Example usage
// const courseId = "67b4f36c076c894c1adaf8aa"; // Replace with actual course ID

// updateCourseChapters(courseId, firstPart)
//   .then((updatedCourse) => {
//     console.log("Updated Course:", updatedCourse);
//   })
//   .catch(console.error);
