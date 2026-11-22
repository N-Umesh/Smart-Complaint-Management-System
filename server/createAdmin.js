import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { connectDB } from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB();

    const adminEmail = "admin@smartcity.com";
    const adminPassword = "Admin@123";

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      // Make sure the account is admin
      existingAdmin.role = "admin";

      await existingAdmin.save();

      console.log("=================================");
      console.log("Admin account already exists.");
      console.log("Role updated to admin.");
      console.log("Email:", adminEmail);
      console.log("=================================");

      process.exit(0);
    }

    // Hash admin password
    const hashedPassword = await bcrypt.hash(
      adminPassword,
      10
    );

    // Create admin
    const admin = await User.create({
      name: "Smart City Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",

      branch: "",
      year: "",
      skills: [],
      interests: [],
      bio: "",
      github: "",
      linkedin: "",
    });

    console.log("=================================");
    console.log("ADMIN ACCOUNT CREATED");
    console.log("=================================");
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);
    console.log("Password:", adminPassword);
    console.log("Role:", admin.role);
    console.log("=================================");

    process.exit(0);
  } catch (error) {
    console.error("CREATE ADMIN ERROR:", error);

    process.exit(1);
  }
};

createAdmin();