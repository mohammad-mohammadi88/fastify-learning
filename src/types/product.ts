import z from "zod";

import {
    createProductSchema,
    productsResponseSchema,
    productResponseSchema,
} from "@/schemas/product.schema.js";

export type CreateProduct = z.infer<typeof createProductSchema>;
export type ProductResponse = z.infer<typeof productResponseSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
