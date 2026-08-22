const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../src/models/user.model");
require("dotenv").config();

const setupAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/bagru-cotton");
    console.log("Connected to MongoDB");

    // Admin credentials
    const adminEmail = "bagrucottonfeb23@gmail.com";
    const adminPassword = "Bagru@Admin2024"; // Strong password
    const adminName = "Bagru Admin";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists with email:", adminEmail);
      
      // Update password and role if needed
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "ADMIN";
      existingAdmin.firstName = adminName;
      await existingAdmin.save();
      console.log("Admin updated successfully");
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new User({
        firstName: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN"
      });
      await admin.save();
      console.log("Admin user created successfully");
    }

    console.log("=================================");
    console.log("Admin Credentials:");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("=================================");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error setting up admin:", error);
    process.exit(1);
  }
};

setupAdmin();