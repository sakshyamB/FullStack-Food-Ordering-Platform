import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('Your MongoDB has connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

export { connectDB };
