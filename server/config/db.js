import dns from "node:dns";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in .env");
    }

    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    console.log("Using DNS servers:", dns.getServers());

    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "hotel_booking",
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });

    const pingResult = await mongoose.connection.db.admin().ping();
    console.log("🏓 MongoDB ping successful", pingResult);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;