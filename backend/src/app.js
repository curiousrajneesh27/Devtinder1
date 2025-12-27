import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { initializeSocket } from "./utils/socket.js";
import { FRONTEND_URL } from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notfoundMiddleware } from "./middlewares/notfound.middleware.js";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import requestRouter from "./routes/request.routes.js";
import userRouter from "./routes/user.routes.js";
import healthRouter from "./routes/health.routes.js";
import messageRouter from "./routes/message.routes.js";
import moderationRouter from "./routes/moderation.routes.js";
import activityRouter from "./routes/activity.routes.js";
import fileRouter from "./routes/file.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"]
    })
);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/moderation", moderationRouter);
app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/file", fileRouter);

app.use(errorMiddleware);
app.use(notfoundMiddleware);

const server = http.createServer(app);
initializeSocket(server);
export { app, server };
