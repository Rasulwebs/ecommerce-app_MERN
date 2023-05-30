import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connnect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect Database MongoDB");
  } catch (error) {
    console.log(`Error in MongoDB ${error}`);
  }
  
};
export default connectDB;
