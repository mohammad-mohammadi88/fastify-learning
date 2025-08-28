import errorHandler from "@/utils/errorHandler.js";
import type { CreateUser } from "@/types/user.js";
import prisma from "./prisma.js";

type GetUser = { id: number } | { email: string };
class UserStore {
    private database = prisma.user;
    public createUser = (data: CreateUser) =>
        errorHandler(() => this.database.create({ data }), "creating user");

    public getSingleUser = (where: GetUser) =>
        errorHandler(
            () =>
                this.database.findUnique({
                    where,
                }),
            "getting user"
        );
}
export default new UserStore();
