import express from "express";
import logger from "./utils/logger";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";

import deserializeUser from "./middleware/deserializeUser";

import userRouter from "./routes/user.routes";
import sessionRouter from "./routes/session.routes";
import productRouter from "./routes/product.routes";

import { getCurrentUser } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";

const app = express();

app.use(
    cors({
        origin: config.get("origin"),
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(deserializeUser);

// Routes
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRouter);

// Current user
app.get("/api/me", requireUser, getCurrentUser);

// Health check
app.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));

// Error handling
app.use((req, res, next) => {
    const error = new Error("Not found");
    logger.error(error);

    return res.status(404).json({ message: error.message });
});

export default app;
