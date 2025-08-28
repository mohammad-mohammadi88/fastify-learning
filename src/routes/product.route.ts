import {
    getAllProductsOptions,
    getSingleProductOptions,
    postProductOptions,
} from "@/options/product.options.js";
import addTags from "@/utils/addTags.js";
import type { FastifyInstance } from "fastify";

const productRoutes = async (server: FastifyInstance) => {
    // validation
    server.addHook("preValidation", server.authenticate);

    // routes
    server.post("/", addTags(postProductOptions, "Users"));
    server.get("/", addTags(getAllProductsOptions, "Users"));
    server.get("/:id", addTags(getSingleProductOptions, "Users"));
};

export default productRoutes;
