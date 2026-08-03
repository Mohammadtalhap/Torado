import { Router } from "express";
import { createBlogController, deleteBlogController, getAdminBlogsController, getAllBlogsController, getBlogByIdController, getBlogBySlugController, updateBlogController } from "../controllers/blogController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import createUploadMiddleware from "../middlewares/uploadMiddleware.js";

const upload = createUploadMiddleware("blogs");

const router = Router();

/*===================================
            Static Routes
==================================== */

router.get("/", getAllBlogsController);

router.post("/", authMiddleware, upload.single("image"), createBlogController);

router.get("/admin", authMiddleware, getAdminBlogsController);

router.get("/admin/:id", authMiddleware, getBlogByIdController);


/*===================================
            Dynamic Routes
==================================== */

router.put("/:id", authMiddleware, upload.single("image"), updateBlogController);

router.delete("/:id", authMiddleware, deleteBlogController);

router.get("/:slug", getBlogBySlugController);


export default router;