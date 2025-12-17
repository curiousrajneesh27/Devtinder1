import mongoose from "mongoose";
import { MONGODB_URL } from "../config/config.js";

export const connectMongoDB = async () => {
    try {
        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL is undefined. Please check your .env file and config.js.");
        }

        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URL, { dbName: "devtinder" });
        console.log("✅ MongoDB is connected successfully");
    } catch (err) {
        console.error("❌ Error while connecting to MongoDB:", err.message);
        process.exit(1);
    }
};