import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import Admin from "../models/adminModel.js";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS;

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // check if admin exist
        const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit(0);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);

        // Create Admin
        await Admin.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
        });

        console.log("Admin created successfully.");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding admin:", error.message);
        process.exit(1);
    }
}

seedAdmin();