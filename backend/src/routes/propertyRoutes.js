import { Router } from "express";
import { createPropertyController, deletePropertyController, getAllPropertiesController, getPropertyByIdController, updatePropertyController } from "../controllers/propertyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/", authMiddleware, upload.array("images", 10), createPropertyController);
router.get("/", getAllPropertiesController);
router.get("/:id", getPropertyByIdController);
router.put("/:id", authMiddleware, upload.array("images", 10), updatePropertyController);
router.delete("/:id", authMiddleware, deletePropertyController);

export default router;