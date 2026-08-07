import { Router } from "express";
import { getAdminProfileController, loginAdminController } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", loginAdminController);
router.get("/profile", authMiddleware, getAdminProfileController);

export default router;