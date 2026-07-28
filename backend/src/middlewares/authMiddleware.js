import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const getToken = (req) => {
    const token = req.cookies.token;

    if (!token) {
        throw new Error("Authentication required for this action.");
    }

    return token;
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

const findAdmin = async (adminId) => {
    const admin = await Admin.findById(adminId);

    if (!admin) {
        throw new Error("Admin not found.");
    }

    return admin;
}

const authMiddleware = async (req, res, next) => {
    const token = getToken(req);

    const decoded = verifyToken(token);

    const admin = await findAdmin(decoded.adminId);

    req.admin = admin;

    next();
}

export default authMiddleware;