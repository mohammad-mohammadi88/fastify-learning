import type { FastifyInstance } from "fastify";

import {
    createUserOptions,
    loginUserOptions,
    getUserOptions,
} from "@/options/user.options.js";
import addTags from "@/utils/addTags.js";

const userRoutes = async (server: FastifyInstance) => {
    server.post("/register", addTags(createUserOptions, "Products"));
    server.post("/login", addTags(loginUserOptions, "Products"));
    server.get(
        "/:id",
        addTags(
            {
                ...getUserOptions,
                preValidation: [server.authenticate],
            },
            "Products"
        )
    );
};

export default userRoutes;
