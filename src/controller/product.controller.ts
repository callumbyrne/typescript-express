import { Request, Response } from "express";
import {
    CreateProductInput,
    UpdateProductInput,
} from "../schema/product.schema";
import {
    createProduct,
    deleteProduct,
    findAndUpdateProduct,
    findProduct,
} from "../service/product.service";

export async function createProductHandler(
    req: Request<{}, {}, CreateProductInput["body"]>,
    res: Response
) {
    // Could wrap this in a try catch block
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });

    return res.send(product);
}

export async function getProductHandler(
    req: Request<UpdateProductInput["params"]>,
    res: Response
) {
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
        res.sendStatus(404);
    }

    res.send(product);
}

export async function updateProductHandler(
    req: Request<UpdateProductInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
        res.sendStatus(404);
    }

    //  could be null?
    if (String(product!.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
        new: true,
    });

    return res.send(updatedProduct);
}

export async function deleteProductHandler(
    req: Request<UpdateProductInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
        res.sendStatus(404);
    }

    //  could be null?
    if (String(product!.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
}
