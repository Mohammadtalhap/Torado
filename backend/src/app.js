import cookieParser from "cookie-parser";
import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", healthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);

// Last Middleware (Error)
app.use(errorMiddleware);

export default app;