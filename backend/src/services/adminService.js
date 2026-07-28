import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import ApiError from "../utils/apiError.js";

const findAdmin = async (email) => {
    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new ApiError(401, "Invalid email or password.");
    }

    return admin;
}

const verifyPassword = (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
}

const generateToken = (id) => {
    return jwt.sign(
        {
            adminId: id,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d",
        }
    );
}

export const loginAdmin = async ({ email, password }) => {

    const admin = await findAdmin(email);

    const isPasswordValid = await verifyPassword(password, admin.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password.");
    }

    const token = generateToken(admin._id);

    return token;
}