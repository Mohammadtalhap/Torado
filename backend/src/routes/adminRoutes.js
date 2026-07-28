import { Router } from "express";
import { loginAdminController } from "../controllers/adminController.js";

const router = Router();

router.post("/login", loginAdminController);

export default router;