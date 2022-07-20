import express from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

export = router;
