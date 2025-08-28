import type { FastifyInstance } from "fastify";

import {
    createUserOptions,
    loginUserOptions,
    getUserOptions,
} from "@/options/user.options.js";

const userRoutes = (server: FastifyInstance) => {
    server.post("/register", createUserOptions);
    server.post("/login", loginUserOptions);
    server.get("/:id", {
        ...getUserOptions,
        preValidation: [server.authenticate],
    });
    return server;
};

export default userRoutes;
