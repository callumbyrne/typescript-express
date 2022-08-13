import express from "express";
import {
    createProductHandler,
    deleteProductHandler,
    getProductHandler,
    updateProductHandler,
} from "../controller/product.controller";
import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema,
} from "../schema/product.schema";

const router = express.Router();

router.post(
    "/",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
);

router.put(
    "/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
);

router.get(
    "/:productId",
    validateResource(getProductSchema),
    getProductHandler
);

router.delete(
    "/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
);

export = router;
