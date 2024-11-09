import mongoose from 'mongoose';

let isConnected = false;

const connectToDb = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });

    isConnected = true;
    console.log('New database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
    
    // Implement exponential backoff retry mechanism
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectToDb();
  }
};

export default connectToDb;