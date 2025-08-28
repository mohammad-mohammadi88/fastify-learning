import {
    createProductHandler,
    getAllProductsHandler,
    getSingleProductHandler,
} from "@/controllers/product.controller.js";
import type { CreateProduct, MyRouteOptions } from "@/types/index.js";
import productSchema from "@/schemas/product.schema.js";
import type { Product } from "@/db/prisma.js";

export const postProductOptions: MyRouteOptions<{
    Body: CreateProduct;
    Reply: Product | string;
}> = {
    schema: {
        response: { 201: productSchema.$ref("productResponseSchema") },
        body: productSchema.$ref("createProductSchema"),
    },
    handler: createProductHandler,
};

export const getAllProductsOptions: MyRouteOptions<{
    Reply: Product[] | string;
}> = {
    schema: { response: { 200: productSchema.$ref("productsResponseSchema") } },
    handler: getAllProductsHandler,
};

export const getSingleProductOptions: MyRouteOptions<{
    Reply: Product | string;
    Params: { id: string };
}> = {
    schema: { response: { 200: productSchema.$ref("productResponseSchema") } },
    handler: getSingleProductHandler,
};
