import { Router } from "express";
import { getAdminProfileController, loginAdminController, logoutAdminController } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", loginAdminController);
router.get("/profile", authMiddleware, getAdminProfileController);
router.post("/logout", logoutAdminController);

export default router;