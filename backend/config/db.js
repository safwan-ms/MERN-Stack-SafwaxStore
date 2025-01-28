import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB successfully connected ✅");
  } catch (error) {
    console.error(`ERROR connection to MongoDB ${error}`);
    process.exit(1);
  }
};
export default connectDB;
