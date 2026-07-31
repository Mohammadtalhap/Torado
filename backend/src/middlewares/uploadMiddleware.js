import fs from "fs";
import multer from "multer";
import path from "path";
import ApiError from "../utils/apiError.js";

const createUploadMiddleware = (folder) => {
    const uploadPath = path.join("src", "public", "uploads", folder);

    // create folder if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });

    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, uploadPath);
        },
        filename(req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;

            // Save a clean relative path for controllers
            file.relativePath = `uploads/${folder}/${fileName}`;

            cb(null, fileName);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new ApiError(400, "Only image files are allowed."), false);
        }
    }

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024
        }
    });
};

export default createUploadMiddleware;