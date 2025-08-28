import { RouteHandler } from "fastify";

import type { CreateProduct } from "@/types/product.js";
import { productStore, type Product } from "@/db/index.js";

export const createProductHandler: RouteHandler<{
    Body: CreateProduct;
    Reply: Product | string;
}> = async (req, res) => {
    const data = { ...req.body, ownerId: req.user.id };

    // create product
    const product = await productStore.createUser(data);

    // error handling
    if (typeof product === "string") return res.code(500).send(product);

    // send product
    return res.code(201).send(product);
};

export const getSingleProductHandler: RouteHandler<{
    Reply: Product | string;
    Params: { id: string };
}> = async (req, res) => {
    const { id } = req.params;

    // get product
    const product = await productStore.getSingleProduct(Number(id));

    // check existence
    if (product === null)
        return res.code(404).send("This Product doesn't exists");

    // error handling
    if (typeof product === "string") return res.code(500).send(product);

    // send product
    return res.send(product);
};

export const getAllProductsHandler: RouteHandler<{
    Reply: Product[] | string;
}> = async (_, res) => {
    // get products
    const product = await productStore.getAllProducts();

    // error handling
    if (typeof product === "string") return res.code(500).send(product);

    // send product
    return res.send(product);
};
