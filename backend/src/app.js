import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// Routes
app.use("/", healthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/blogs", blogRoutes);

// Last Middleware (Error)
app.use(errorMiddleware);

export default app;