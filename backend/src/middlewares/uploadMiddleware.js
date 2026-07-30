import multer from "multer";
import ApiError from "../utils/apiError.js";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "src/public/uploads/properties");
    },
    filename(req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;

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

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
});

export default upload;