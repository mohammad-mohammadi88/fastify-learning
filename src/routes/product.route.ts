import {
    getAllProductsOptions,
    getSingleProductOptions,
    postProductOptions,
} from "@/options/product.options.js";
import type { FastifyInstance } from "fastify";

const productRoutes = async (server: FastifyInstance) => {
    // validation
    server.addHook("preValidation", server.authenticate);

    // routes
    server.post("/", postProductOptions);
    server.get("/", getAllProductsOptions);
    server.get("/:id", getSingleProductOptions);
};

export default productRoutes;
