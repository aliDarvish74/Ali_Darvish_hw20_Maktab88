import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/hw20`);
    console.log("[+] Connected to MongoDB...");
  } catch (error: any) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};
