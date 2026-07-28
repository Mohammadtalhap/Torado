import { Router } from "express";
import { createPropertyController, deletePropertyController, getAllPropertiesController, getPropertyByIdController, updatePropertyController } from "../controllers/propertyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createPropertyController);
router.get("/", getAllPropertiesController);
router.get("/:id", getPropertyByIdController);
router.put("/:id", authMiddleware, updatePropertyController);
router.delete("/:id", authMiddleware, deletePropertyController);

export default router;