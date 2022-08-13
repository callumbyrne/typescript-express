import express from "express";
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler,
} from "../controller/session.controller";
import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createSessionSchema } from "../schema/session.schema";

const router = express.Router();

router.post(
    "/",
    validateResource(createSessionSchema),
    createUserSessionHandler
);

router.get("/", requireUser, getUserSessionsHandler);

router.delete("/", requireUser, deleteSessionHandler);

export = router;
