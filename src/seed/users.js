import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/Users.js";

dotenv.config();

const users = [
  {
    name: "Loyola",
    email: "loyola@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    name: "Test User",
    email: "user@example.com",
    password: "user123",
    role: "user"
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Optional: clear existing users
    await User.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    await User.insertMany(hashedUsers);

    console.log("✅ Users seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
