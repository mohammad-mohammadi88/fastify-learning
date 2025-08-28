import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// default fields
const title = z.string().max(255);
const content = z.string().optional();
const price = z
    .number({ invalid_type_error: "Price should be type of number" })
    .min(1);
const id = z.number();
const ownerId = z.number();

// product core
const productCore = { title, content, price };

// response schemas
export const createProductSchema = z.object(productCore);

export const productResponseSchema = z.object({ ...productCore, id, ownerId });

export const productsResponseSchema = z.array(productResponseSchema);

export default buildJsonSchemas(
    {
        createProductSchema,
        productResponseSchema,
        productsResponseSchema,
    },
    { $id: "ProductSchemas" }
);
