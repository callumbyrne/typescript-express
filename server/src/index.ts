import app from "./app";
import config from "config";
import logger from "./utils/logger";
import connect from "./utils/connect";

const port = config.get<number>("port");

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    await connect();
});
