import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin } from "./models/userModel.js";

dotenv.config();

const runSeed = async () => {
  try {
    console.log("⏳ Connecting to Database...");
    await mongoose.connect('mongodb://localhost:27017/buildestate');
    console.log("✅ Connected to MongoDB successfully!");

    // 1. Delete the corrupted double-hashed admin
    await Admin.deleteMany({});
    console.log("🗑️ Cleared old corrupted admin accounts.");

    // 2. Create new admin with RAW password (Mongoose will hash it exactly once)
    console.log("⏳ Creating fresh Admin Account...");
    const newAdmin = new Admin({
      email: "admin@buildestate.com",
      password: "1234" // Raw password here
    });

    await newAdmin.save();
    console.log("🎉 SUCCESS! Perfect admin account created.");
    process.exit(0);
    
  } catch (err) {
    console.error("❌ ERROR:", err.message);
    process.exit(1);
  }
};

runSeed();