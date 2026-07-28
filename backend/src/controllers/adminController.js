import { loginAdmin } from "../services/adminService.js";

export const loginAdminController = async (req, res) => {
    const { email, password } = req.body;

    const token = await loginAdmin({ email, password });

    res
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
            success: true,
            message: "Admin logged in successfully!",
        });
};