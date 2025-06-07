import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DB_STRING) {
      throw new Error("Database connection string is not defined");
    }

    const conn = await mongoose.connect(process.env.DB_STRING, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB Connected: ", conn.connection.host);
    
    // Handle connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

  } catch (error) {
    console.error("Database connection error:", error.message);
    // Retry connection after 5 seconds
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
