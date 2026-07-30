import multer from "multer";

const errorMiddleware = (err, req, res, next) => {

    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "Image size should be less than 5MB",
            });
        }
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid property ID"
        });
    }

    const statusCode = err.statusCode || 500;

    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message: message,
    });
}

export default errorMiddleware;