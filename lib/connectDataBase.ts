import mongoose from "mongoose";

let isConnected = false;

const connectToDb = async (retries = 5) => {
  // mongoose.set("debug", true);
  mongoose.set("strictQuery", true);

  if (isConnected) {
    // console.log("Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    isConnected = true;
    // console.log("New database connection established");
  } catch (error) {
    console.error("Database connection error:", error);

    if (retries > 0) {
      // console.log(`Retrying connection... (${5 - retries + 1})`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait before retrying
      return connectToDb(retries - 1); // Retry connection
    } else {
      console.error("Max retries reached. Could not connect to the database.");
      console.error("Database connection failed after multiple attempts.");
    }
  }
};

export default connectToDb;
