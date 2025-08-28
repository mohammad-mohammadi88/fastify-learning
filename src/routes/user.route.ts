import type { FastifyInstance } from "fastify";

import {
    createUserOptions,
    loginUserOptions,
    getUserOptions,
} from "@/options/user.options.js";

const userRoutes = async (server: FastifyInstance) => {
    server.post("/register", createUserOptions);
    server.post("/login", loginUserOptions);
    server.get("/:id", {
        ...getUserOptions,
        preValidation: [server.authenticate],
    });
};

export default userRoutes;
