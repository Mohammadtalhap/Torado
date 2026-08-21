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

export const getAdminProfileController = async (req, res) => {
    const { _id, name, email } = req.admin;

    res.status(200).json({
        success: true,
        data: {
            _id,
            name,
            email,
        }
    });
};

export const logoutAdminController = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.status(200).json({
        success: true,
        message: "Admin logged out successfully!",
        data: {},
    });
}