import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();

const url: string = process.env.MONGODB_URI || "";

const connectDB = async () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log(`DATABASE CONNECTED..!!`);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export { connectDB };
