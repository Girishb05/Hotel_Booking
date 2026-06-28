import "./dnsSetup.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_DB_URL;

    if (!mongoURI) {
      throw new Error("MONGODB_URL is not defined in .env");
    }

    console.log("🔄 Connecting to MongoDB Atlas...");

    await mongoose.connect(mongoURI, {
      dbName: "test",
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("🔗 Ready State:", mongoose.connection.readyState);

    // Ping Database
    const pingResult = await mongoose.connection.db.admin().ping();
    console.log("🏓 Ping Result:", pingResult);

    // List Collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    console.log(
      "📂 Collections:",
      collections.length
        ? collections.map((c) => c.name)
        : "No collections found"
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error("Error:", error.message);
  }
};

// Database Health Check
const pingDB = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return {
        success: false,
        message: "Database is not connected",
        readyState: mongoose.connection.readyState,
      };
    }

    const result = await mongoose.connection.db.admin().ping();

    return {
      success: true,
      message: "MongoDB is responsive",
      ping: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Database Information
const getDBInfo = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return {
        success: false,
        message: "Database is not connected",
      };
    }

    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const stats = await db.stats();

    return {
      success: true,
      database: mongoose.connection.name,
      collections: collections.map((c) => c.name),
      collectionsCount: collections.length,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default connectDB;
export { pingDB, getDBInfo };