export const healthController = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully!"
    });
}
    