import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { Admin } from '../models/userModel.js';

const createAdminUser = async () => {
  try {
    // 1. Connect to your LOCAL database directly
    console.log('Connecting to local MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/buildestate');
    console.log('Connected to MongoDB');

    // 2. Set the email and password manually here
    const email = "admin@buildestate.com";
    const password = "Admin@1234"; // Use a strong password in production

    // 3. Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }

    // 4. Create the admin
    const admin = new Admin({ email, password });
    await admin.save();
    
    console.log('====================================');
    console.log('✅ SUCCESS! Admin created manually.');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('====================================');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  }
};

createAdminUser();