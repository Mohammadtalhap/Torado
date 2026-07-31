import { Router } from "express";
import { createAgentController, deleteAgentController, getAgentByIdController, getAllAgentsController, updateAgentController } from "../controllers/agentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import createUploadMiddleware from "../middlewares/uploadMiddleware.js";

const upload = createUploadMiddleware("agents");

const router = Router();

router.post("/", authMiddleware, upload.single("image"), createAgentController);
router.get("/", getAllAgentsController);
router.get("/:id", getAgentByIdController);
router.put("/:id", authMiddleware, upload.single("image"), updateAgentController);
router.delete("/:id", authMiddleware, deleteAgentController);

export default router;