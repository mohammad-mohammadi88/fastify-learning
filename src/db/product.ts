import errorHandler from "@/utils/errorHandler.js";
import prisma from "./prisma.js";
import type { CreateProduct } from "@/types/product.js";

class ProductStore {
    private database = prisma.product;
    public createUser = (data: CreateProduct & { ownerId: number }) =>
        errorHandler(() => this.database.create({ data }), "creating product");

    public getSingleProduct = async (id: number) =>
        errorHandler(
            () => this.database.findUnique({ where: { id } }),
            "getting single product"
        );

    public getAllProducts = () =>
        errorHandler(() => this.database.findMany(), "getting all products");
}
export default new ProductStore();
