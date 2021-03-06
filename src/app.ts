import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";

import deserializeUser from "./middleware/deserializeUser";

import userRouter from "./routes/user.routes";
import sessionRouter from "./routes/session.routes";
import productRouter from "./routes/product.routes";

const port = config.get<number>("port");

const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    await connect();

    // Routes
    app.use("/api/users", userRouter);
    app.use("/api/sessions", sessionRouter);
    app.use("/api/products", productRouter);

    // Health check
    app.get("/ping", (req, res, next) =>
        res.status(200).json({ message: "pong" })
    );

    // Error handling
    app.use((req, res, next) => {
        const error = new Error("Not found");
        logger.error(error);

        return res.status(404).json({ message: error.message });
    });
});
